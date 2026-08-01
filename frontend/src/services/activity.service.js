import api from "../api/axios";

export const getAllActivity = async (params) => {
  const res = await api.get(`/activities?${params}`);
  return res.data.data;
};
