import api from "../api/axios";

export const getSettings = async () => {
  const response = await api.get("/settings");

  return response.data.data;
};

export const updateSettings = async (payload) => {
  const response = await api.patch("/settings", payload);

  return response.data.data;
};
