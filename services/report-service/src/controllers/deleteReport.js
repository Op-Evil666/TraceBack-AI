import Report from "../models/reportModel.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";

const deleteReport = async (req, res) => {
    const report = req.report;

    await Report.deleteOne({ _id: report._id });

    if (report.images[0]?.publicId) {
        await deleteFromCloudinary(
            report.images[0].publicId
        );
    }

    return res.status(200).json({
        success: true,
        message: "Report deleted successfully"
    });
};

export default deleteReport;
