import User from "../models/userModel.js";
import TokenFamily from "../models/tokenFamily.js";
import { hashPassword, verifyPassword } from "../utils/passwordUtils.js";
import { generateAccessToken, generateRefreshToken, hashRefreshToken } from "../utils/tokenUtils.js";
import { setRefreshTokenCookie } from "../utils/cookieUtils.js";
import { generateOtp, hashOtp } from "../utils/otpUtils.js";
import { sendVerificationEmail } from "../utils/emailUtils.js";
import AppError from "../utils/appError.js";
import crypto from "crypto";
import mongoose from "mongoose";

const registerService = async (registerData) => {
    const { name, email, password } = registerData;
    if (
        typeof name !== "string" ||
        typeof email !== "string" ||
        typeof password !== "string" ||
        !name.trim() ||
        !email.trim() ||
        !password
    ) {
        throw new AppError("Provide all required details", 400);
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({
        $or: [{ email: normalizedEmail }],
    });
    if (existingUser) {
        throw new AppError("Email is already registered", 409);
    }
    const hashedPassword = await hashPassword(password);
    let user;
    try {
        user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            isVerified: false,
            verificationOtpHash: null,
            verificationOtpExpiresAt: null,
            verificationOtpAttempts: 0,
            verificationOtpLastSentAt: null,
            verificationOtpLockedUntil: null,
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new AppError("Email is already registered", 409);
        }
        throw error;
    }
    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const now = new Date();
    user.verificationOtpHash = otpHash;
    user.verificationOtpExpiresAt = new Date(now.getTime() + 5 * 60 * 1000);
    user.verificationOtpAttempts = 0;
    user.verificationOtpLastSentAt = now;
    user.verificationOtpLockedUntil = null;
    await user.save();
    
    try {
        await sendVerificationEmail(user.email, otp);
    } catch (error) {
        console.error("Verification email delivery failed", {
           userId: user._id.toString(),
          message: error.message,
        });
        throw new AppError(
            "Your account was created, but the verification email could not be sent. Please request another OTP.",
            503
        );
    }
    return user;
};

const loginService = async (loginData, res) => {
    const { password } = loginData;
    const email = loginData.email.trim().toLowerCase();
    const user = await User.findOne({ email }).select("+password");
    
    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }
    if (!user.isVerified) {
        throw new AppError("Please verify your email before logging in", 401);
    }
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
        throw new AppError("Invalid credentials", 401);
    }

    const accessToken = generateAccessToken(user._id, user.role);
    
    // Create structured token: familyId.secret
    const { familyId, refreshToken, hashedToken } = generateRefreshToken();

    await TokenFamily.create({
        user: user._id,
        role: user.role,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        tokenHash: hashedToken,
        version: 1,
        familyId: familyId,
        revoked: false,
        revokedAt: null
    });

    setRefreshTokenCookie(res, refreshToken);
    return accessToken;
};

const logoutService = async (refreshToken) => {
    if (!refreshToken) throw new AppError("Token required", 400);
    const parts = refreshToken.split(".");
    if (parts.length !== 2) throw new AppError("Invalid token format", 401);
    const [familyId, tokenSecret] = parts;

    const hashToken = hashRefreshToken(tokenSecret);
    const valid = await TokenFamily.findOne({ familyId, tokenHash: hashToken }); 
    if (!valid || valid.expiresAt < Date.now() || valid.revoked) {
        throw new AppError("Invalid or revoked token", 401);
    }
    
    await TokenFamily.findByIdAndUpdate(valid._id, { 
        revoked: true, 
        revokedAt: new Date() 
    });
    return { success: true };
};


const refreshService = async (refreshToken, res) => {
    if (!refreshToken || typeof refreshToken !== "string") {
        throw new AppError("Refresh token required", 401);
    }

    // 1. Validate token structure
    const parts = refreshToken.split(".");

    if (parts.length !== 2) {
        throw new AppError("Invalid token format", 401);
    }

    const [familyId, tokenSecret] = parts;

    const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (
        !uuidRegex.test(familyId) ||
        !/^[a-f0-9]{128}$/i.test(tokenSecret)
    ) {
        throw new AppError("Invalid token format", 401);
    }

    // 2. Hash the presented secret
    const hashedToken = hashRefreshToken(tokenSecret);

    // 3. Find the token family
    const tokenDoc = await TokenFamily.findOne({ familyId })
        .populate("user", "role isVerified");

    if (!tokenDoc) {
        throw new AppError("Invalid token family", 401);
    }

    // 4. Check family status
    if (
        tokenDoc.revoked ||
        tokenDoc.expiresAt <= new Date()
    ) {
        throw new AppError("Expired or revoked token family", 401);
    }

    const liveUser = tokenDoc.user;

    if (!liveUser || !liveUser.isVerified) {
        throw new AppError("User no longer authorized", 401);
    }

    // 5. Check whether the presented token is current
    const isMatchingCurrentToken = crypto.timingSafeEqual(
        Buffer.from(tokenDoc.tokenHash, "hex"),
        Buffer.from(hashedToken, "hex")
    );

    // 6. Detect refresh-token reuse
    if (!isMatchingCurrentToken) {
        await TokenFamily.updateOne(
            {
                _id: tokenDoc._id,
                revoked: false
            },
            {
                $set: {
                    revoked: true,
                    revokedAt: new Date()
                }
            }
        );

        throw new AppError(
            "Security alert: Refresh token reuse detected.",
            401
        );
    }

    // 7. Generate new refresh token using SAME familyId
    const newTokenSecret = crypto.randomBytes(64).toString("hex");

    const newRefreshToken = `${familyId}.${newTokenSecret}`;

    const newHash = hashRefreshToken(newTokenSecret);

    // 8. Atomically rotate the refresh token
    const updatedFamily = await TokenFamily.findOneAndUpdate(
    {
        _id: tokenDoc._id,
        familyId,
        tokenHash: hashedToken,
        revoked: false,
        expiresAt: mongoose.trusted({
            $gt: new Date()
        })
    },
    {
        $set: {
            tokenHash: newHash,
            role: liveUser.role
        },
        $inc: {
            version: 1
        }
    },
    {
        returnDocument: "after",
        runValidators: true
    }
);

    // 9. Another request may have rotated the token first
    if (!updatedFamily) {
        throw new AppError(
            "Refresh token is no longer valid.",
            401
        );
    }

    // 10. Issue new access token and refresh cookie
    const accessToken = generateAccessToken(
        liveUser._id.toString(),
        liveUser.role
    );

    setRefreshTokenCookie(res, newRefreshToken);

    return accessToken;
};


export { registerService, loginService, logoutService, refreshService };