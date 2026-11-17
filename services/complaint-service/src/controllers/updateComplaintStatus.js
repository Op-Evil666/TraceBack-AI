import Complaint from "../models/complaintModel.js";
import AppError from "../utils/appError.js";

const updateComplaintStatus = async (req, res) => {
    const { status } = req.validatedBody;

    const complaint = await Complaint.findById(req.validatedParams.id);

    if (!complaint) {
        throw new AppError("Report not found", 404);
    }

    // AI Service: pending -> in_progress
    if (
        status === "in_progress" &&
        complaint.status === "pending"
    ) {
        complaint.status = "in_progress";
    }

    // Admin: in_progress -> resolved
    else if (
        status === "resolved" &&
        complaint.status === "in_progress"
    ) {
        complaint.status = "resolved";
    }

    // Reject every other transition
    else {
        throw new AppError("Invalid complaint status transition", 400);
    }

    await complaint.save();

    return res.status(200).json({
        success: true,
        message: "Complaint status updated successfully",
        complaint
    });
};

export default updateComplaintStatus;