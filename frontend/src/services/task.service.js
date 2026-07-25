import api from "../api/axios";

export const getTaskDetails = async (taskId) => {
  const res = await api.get(`tasks/${taskId}`);

  return res.data.data;
};

export const getTaskActivities = async (taskId) => {
  const res = await api.get(`/activities/${taskId}`);

  return res.data.data;
};
