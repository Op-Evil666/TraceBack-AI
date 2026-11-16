import Report from '../models/reportModel.js';
import AppError from '../utils/appError.js';

const getSpecificReport = async (req, res) =>{
    const report = await Report.findById(req.validatedParams.id);
        if(!report){
            throw new AppError("Report not found", 404);
        }
    res.status(200).json({
        success: true,
        report
    });
}

export default getSpecificReport;