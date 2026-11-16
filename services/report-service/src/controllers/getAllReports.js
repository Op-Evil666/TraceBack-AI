import Report from "../models/reportModel.js";
import AppError from "../utils/appError.js";

const getAllReports = async (req, res) =>{
    const { page, limit } = req.validatedQuery;
    const totalReports = await Report.countDocuments();
    if(totalReports === 0){
        return res.status(200).json({
            success: true,
            reports: []
        });
    }
    const totalPages = Math.ceil(totalReports/limit);
    if(page>totalPages){
        throw new AppError("Page not found", 400);
    }
    const skip = (page - 1) * limit;
    const reports = await Report.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.status(200).json({
        success: true,
        totalReports,
        totalPages,
        reports
    });
}

export default getAllReports;