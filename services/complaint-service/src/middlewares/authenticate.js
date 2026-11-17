import verifyAccessToken from "../utils/tokenUtils.js";
import AppError from "../utils/appError.js";

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new AppError("No token found", 401));
    }

    const [scheme, token, ...extra] = authHeader.trim().split(/\s+/);

    if (scheme !== "Bearer" || !token || extra.length > 0) {
        return next(new AppError("Invalid authorization header", 401));
    }

    let payload;

    try {
        payload = verifyAccessToken(token);
    } catch (error) {
        return next(new AppError("Invalid or expired token", 401));
    }

    if (
        !payload ||
        typeof payload !== "object" ||
        !payload.userId ||
        !["user", "admin"].includes(payload.role)
    ) {
        return next(new AppError("Invalid token payload", 401));
    }

    req.user = {
        userId: payload.userId,
        role: payload.role
    };

    next();
};

export default authenticate;