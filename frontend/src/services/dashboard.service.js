import api from "../api/axios";

export const getAdminDashboard = async () => {
  const response = await api.get("/dashboard/stats");
  return response.data.data;
};

export const getMemberDashboard = async () => {
  const response = await api.get("/dashboard/member");
  return response.data.data;
};
