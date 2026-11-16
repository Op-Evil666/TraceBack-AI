import AppError from "../utils/appError.js";

const updateReport = async (req, res) => {
    const report = req.report;

    if (report.status === "resolved") {
        throw new AppError("Resolved reports cannot be modified", 409);
    }

    Object.assign(report, req.validatedBody);

    await report.save();

    return res.status(200).json({
        success: true,
        message: "Report updated successfully",
        report
    });
};

export default updateReport;
