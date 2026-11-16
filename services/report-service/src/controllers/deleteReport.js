import Report from "../models/reportModel.js";

const deleteReport = async (req, res) => {
    const report = req.report;

    await Report.deleteOne({ _id: report._id });

    return res.status(200).json({
        success: true,
        message: "Report deleted successfully"
    });
};

export default deleteReport;
