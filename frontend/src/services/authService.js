import { api } from "./api";

const registerUser = async (registerData) => {
  const response = await api.post("/users/register", registerData);
  return response.data;
};

const loginUser = async (loginData) => {
  const response = await api.post("/users/login", loginData);
  return response.data;
};

const verifyUser = async (userId, otp) => {
  const response = await api.post(
    `/users/verify-otp/${encodeURIComponent(userId)}`,
    { otp }
  );

  return response.data;
};

const refreshUser = async () => {
  const response = await api.post("/users/refresh");
  return response.data;
};

const logoutUser = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

const getMe = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export { registerUser, refreshUser, loginUser, logoutUser, verifyUser, getMe };