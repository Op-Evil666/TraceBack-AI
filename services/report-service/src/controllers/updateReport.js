import AppError from "../utils/appError.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

const updateReport = async (req, res) => {
    const report = req.report;

    if (report.status === "resolved") {
        throw new AppError("Resolved reports cannot be modified", 409);
    }

    const oldImage = report.images[0];

    Object.assign(report, req.validatedBody);

    let newImage;

    if (req.file) {
            newImage = await uploadToCloudinary(req.file);
    
            report.images = [newImage];
        }

    await report.save();

    if (newImage && oldImage?.publicId) {
        await deleteFromCloudinary(oldImage.publicId);
    }

    return res.status(200).json({
        success: true,
        message: "Report updated successfully",
        report
    });
};

export default updateReport;
