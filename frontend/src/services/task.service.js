import api from "../api/axios";

export const getTaskDetails = async (taskId) => {
  const res = await api.get(`tasks/${taskId}`);

  return res.data.data;
};
