import Complaint from "../models/complaintModel.js";
import AppError from "../utils/appError.js";

const getMyComplaints = async (req, res) => {
    const { page, limit } = req.validatedQuery;

    const owner = req.user.userId;

    const totalComplaints = await Complaint.countDocuments({ owner });

    const totalPages = Math.ceil(totalComplaints / limit);

    if (totalComplaints > 0 && page > totalPages) {
        throw new AppError("Page not found", 404);
    }

    const skip = (page - 1) * limit;

    const complaints = await Complaint.find({ owner })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return res.status(200).json({
        success: true,
        pagination: {
            totalComplaints,
            totalPages,
            currentPage: page,
            limit
        },
        complaints
    });
};

export default getMyComplaints;
