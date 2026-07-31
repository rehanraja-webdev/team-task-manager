import api from "../api/axios";

export const getAllActivity = async () => {
  const res = await api.get("/activities");
  return res.data.data;
};
