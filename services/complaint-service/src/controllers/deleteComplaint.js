import Complaint from "../models/complaintModel.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

const deleteComplaint = async (req, res) => {
    const complaint = req.complaint;

    await Complaint.deleteOne({ _id: complaint._id });

    if (complaint.images[0]?.publicId) {
        await deleteFromCloudinary(
            complaint.images[0].publicId
        );
    }

    return res.status(200).json({
        success: true,
        message: "Complaint deleted successfully"
    });
};

export default deleteComplaint;