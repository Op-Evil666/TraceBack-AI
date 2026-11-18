
import { api } from "./api";

// Get all lost-item complaints
const getComplaints = async (params = {}) => {
  const response = await api.get("/complaints", { params });
  return response.data;
};

// Get complaints created by the logged-in user
const getMyComplaints = async (params = {}) => {
  const response = await api.get("/complaints/my-complaints", { params });
  return response.data;
};

// Get a specific complaint
const getComplaintById = async (complaintId) => {
  const response = await api.get(
    `/complaints/${encodeURIComponent(complaintId)}`
  );
  return response.data;
};

// Create a lost-item complaint
const createComplaint = async (complaintData) => {
  const response = await api.post("/complaints", complaintData);
  return response.data;
};

// Update an existing complaint
const updateComplaint = async (complaintId, complaintData) => {
  const response = await api.patch(
    `/complaints/${encodeURIComponent(complaintId)}`,
    complaintData
  );
  return response.data;
};

// Delete a complaint
const deleteComplaint = async (complaintId) => {
  const response = await api.delete(
    `/complaints/${encodeURIComponent(complaintId)}`
  );
  return response.data;
};

export {
  getComplaints,
  getMyComplaints,
  getComplaintById,
  createComplaint,
  updateComplaint,
  deleteComplaint,
};
