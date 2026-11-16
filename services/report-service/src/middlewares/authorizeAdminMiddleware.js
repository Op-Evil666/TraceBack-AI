import AppError from "../utils/appError.js";

const authorizeAdminMiddleware = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new AppError("Admin privileges required", 403));
    }

    next();
};

export default authorizeAdminMiddleware;