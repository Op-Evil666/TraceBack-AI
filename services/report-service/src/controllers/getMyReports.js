import Report from "../models/reportModel.js";
import AppError from "../utils/appError.js";

const getMyReports = async (req, res) => {
    const { page, limit } = req.validatedQuery;

    const owner = req.user.userId;

    const totalReports = await Report.countDocuments({ owner });

    const totalPages = Math.ceil(totalReports / limit);

    if (totalReports > 0 && page > totalPages) {
        throw new AppError("Page not found", 404);
    }

    const skip = (page - 1) * limit;

    const reports = await Report.find({ owner })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    return res.status(200).json({
        success: true,
        pagination: {
            totalReports,
            totalPages,
            currentPage: page,
            limit
        },
        reports
    });
};

export default getMyReports;
