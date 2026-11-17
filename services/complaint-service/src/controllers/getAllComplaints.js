import Complaints from "../models/complaintModel.js";
import AppError from "../utils/appError.js";

const getAllReports = async (req, res) =>{
    const { page, limit } = req.validatedQuery;
    const totalComplaints = await Complaints.countDocuments();
    if(totalComplaints === 0){
        return res.status(200).json({
            success: true,
            complaints: []
        });
    }
    const totalPages = Math.ceil(totalComplaints/limit);
    if(page>totalPages){
        throw new AppError("Page not found", 400);
    }
    const skip = (page - 1) * limit;
    const complaints = await Complaints.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.status(200).json({
        success: true,
        totalReports,
        totalPages,
        complaints
    });
}

export default getAllReports;