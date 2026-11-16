import Report from "../models/reportModel.js";
import AppError from "../utils/appError.js";

const authorizeReportMiddleware = async (req, res, next) => {
    const report = await Report.findOne({
        _id: req.validatedParams.id,
        owner: req.user.userId
    });

    if (!report) {
        return next(
            new AppError("Report not found or you are not authorized", 404)
        );
    }

    if (report.status === "resolved" && req.user.role !== "admin") {
        return next(
            new AppError("Resolved reports cannot be modified", 409)
        );
    }

    req.report = report;
    next();
};

export default authorizeReportMiddleware;
