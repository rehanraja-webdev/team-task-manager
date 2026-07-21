import api from "../api/axios";

export const registerUser = async (data) => {
  const response = await api.post("/v1/auth/register", data);
  return response.data;
};

export const loginUser = async (data) => {
  const response = await api.post("/v1/auth/login", data);
  return response.data;
};

export const logoutUser = async (data) => {
  const response = await api.post("/v1/auth/logout", data);
  return response.data;
};

export const getUser = async (data) => {
  const response = await api.get("/v1/auth/me", data);
  return response.data;
};
