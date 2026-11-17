import AppError from "../utils/appError.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

const updateComplaint = async (req, res) => {
    const complaint = req.complaint;

    if (complaint.status === "resolved") {
        throw new AppError("Resolved complaints cannot be modified", 409);
    }

    const oldImage = complaint.images[0];

    Object.assign(complaint, req.validatedBody);

    let newImage;

    if (req.file) {
        newImage = await uploadToCloudinary(req.file);
        complaint.images = [newImage];
    }

    await complaint.save();

    // Delete old image only after MongoDB save succeeds
    if (newImage && oldImage?.publicId) {
        await deleteFromCloudinary(oldImage.publicId);
    }

    return res.status(200).json({
        success: true,
        message: "Complaint updated successfully",
        complaint
    });
};

export default updateComplaint;