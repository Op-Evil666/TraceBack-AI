import Report from "../models/reportModel.js";
import AppError from "../utils/appError.js";

const updateReportStatus = async (req, res) => {
    const { status } = req.validatedBody;

    const report = await Report.findById(req.validatedParams.id);

    if (!report) {
        throw new AppError("Report not found", 404);
    }

    // AI Service: pending -> in_progress
    if (
        status === "in_progress" &&
        report.status === "pending"
    ) {
        report.status = "in_progress";
    }

    // Admin: in_progress -> resolved
    else if (
        status === "resolved" &&
        report.status === "in_progress"
    ) {
        report.status = "resolved";
    }

    // Reject every other transition
    else {
        throw new AppError("Invalid report status transition", 400);
    }

    await report.save();

    return res.status(200).json({
        success: true,
        message: "Report status updated successfully",
        report
    });
};

export default updateReportStatus;