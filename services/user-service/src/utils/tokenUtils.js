import jwt from "jsonwebtoken";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

const generateAccessToken = (userId, role) => {
    return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: "15m" });
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

/**
 * Generates a structured refresh token: familyId.secret
 * This allows instant lookup of the token family in the DB without needing a history queue.
 */
const generateRefreshToken = () => {
    const familyId = uuidv4();
    const tokenSecret = crypto.randomBytes(64).toString("hex");
    return {
        familyId,
        refreshToken: `${familyId}.${tokenSecret}`,
        hashedToken: hashRefreshToken(tokenSecret)
    };
}

const hashRefreshToken = (tokenSecret) => {
    return crypto.createHash("sha256").update(tokenSecret).digest("hex");
}

export { generateAccessToken, verifyAccessToken, generateRefreshToken, hashRefreshToken };