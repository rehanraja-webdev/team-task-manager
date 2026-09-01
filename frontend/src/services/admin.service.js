import api from "../api/axios";

export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data.data;
};

export const getAnalytics = async () => {
  const response = await api.get("/v1/analytics");
  return response.data;
};
