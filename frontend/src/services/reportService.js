
import { api } from "./api";

// Get all found-item reports
const getReports = async (params = {}) => {
  const response = await api.get("/reports", { params });
  return response.data;
};

// Get reports created by the logged-in user
const getMyReports = async (params = {}) => {
  const response = await api.get("/reports/my-reports", { params });
  return response.data;
};

// Get a specific report
const getReportById = async (reportId) => {
  const response = await api.get(`/reports/${encodeURIComponent(reportId)}`);
  return response.data;
};

// Create a found-item report
const createReport = async (reportData) => {
  const response = await api.post("/reports", reportData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Update an existing report
const updateReport = async (reportId, reportData) => {
  const response = await api.patch(
    `/reports/${encodeURIComponent(reportId)}`,
    reportData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Delete a report
const deleteReport = async (reportId) => {
  const response = await api.delete(
    `/reports/${encodeURIComponent(reportId)}`
  );

  return response.data;
};

export {
  getReports,
  getMyReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
