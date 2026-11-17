import Complaint from '../models/complaintModel.js';
import AppError from '../utils/appError.js';

const getSpecificComplaint = async (req, res) =>{
    const complaint = await Complaint.findById(req.validatedParams.id);
        if(!report){
            throw new AppError("Report not found", 404);
        }
    res.status(200).json({
        success: true,
        complaint
    });
}

export default getSpecificComplaint;