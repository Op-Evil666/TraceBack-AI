import Report from '../models/reportModel.js';
import AppError from '../utils/appError.js';
import uploadToCloudinary from '../utils/uploadToCloudinary.js';

const createReport = async(req, res) =>{
    const { title, description, category, location, dateFound } = req.validatedBody;
    if(!title || !description || !category || !location || !dateFound){
        throw new AppError("Provide all necessary details", 400);
    }
    let image;
    if(req.file){
        image = await uploadToCloudinary(req.file);
    }
    const report = await Report.create({ owner: req.user.userId ,title, description, category, location, dateFound, images: image ? [image] : [] });
    res.status(201).json({
        success: true,
        message: "Report created successfully",
        report
    });
}

export default createReport;