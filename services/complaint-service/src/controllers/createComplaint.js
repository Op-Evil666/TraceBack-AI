import Complaint from '../models/complaintModel.js';
import AppError from '../utils/appError.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';

const createComplaint = async(req, res) =>{
    const { title, description, category, location, lostDate } = req.validatedBody;
    if(!title || !description || !category || !location || !lostDate){
        throw new AppError("Provide all necessary details", 400);
    }
    let image;
    if(req.file){
        image = await uploadToCloudinary(req.file);
    }
    const complaint = await Complaint.create({ owner: req.user.userId ,title, description, category, location, lostDate, images: image ? [image] : [] });
    res.status(201).json({
        success: true,
        message: "Report created successfully",
        complaint
    });
}

export default createComplaint;