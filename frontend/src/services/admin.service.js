import api from "../api/axios";

export const getAllUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data.data;
};
