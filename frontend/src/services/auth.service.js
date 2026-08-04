import api from "../api/axios";

export const registerUser = async (data) => {
  const response = await api.post("/v1/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/v1/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/v1/auth/logout");
  return response.data;
};

export const getUser = async () => {
  const response = await api.get("/v1/auth/me");
  return response.data;
};

export const updateProfileService = async () => {
  const response = await api.patch("/v1/auth/profile");
  return response.data;
};

export const changePasswordService = async () => {
  const response = await api.patch("/v1/auth/change-password");
  return response.data;
};

export const getStatistics = async () => {
  const response = await api.get("/v1/auth/statistics");
  return response.data;
};
