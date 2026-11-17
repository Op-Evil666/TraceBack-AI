import Complaint from "../models/complaintModel.js";
import AppError from "../utils/appError.js";

const authorizeComplaintMiddleware = async (req, res, next) => {
    const complaint = await Complaint.findOne({
        _id: req.validatedParams.id,
        owner: req.user.userId
    });

    if (!complaint) {
        return next(
            new AppError("Complaint not found or you are not authorized", 404)
        );
    }

    if (complaint.status === "resolved" && req.user.role !== "admin") {
        return next(
            new AppError("Resolved complaints cannot be modified", 409)
        );
    }

    req.complaint = complaint;
    next();
};

export default authorizeComplaintMiddleware;
