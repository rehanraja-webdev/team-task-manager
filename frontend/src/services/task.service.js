import api from "../api/axios";

export const createATask = async (formData) => {
  const res = await api.post("/tasks/", formData);

  return res.data;
};

export const deleteTaskById = async (taskId) => {
  const res = await api.delete(`/tasks/${taskId}`);

  return res.data;
};

export const getTaskDetails = async (taskId) => {
  const res = await api.get(`/tasks/${taskId}`);

  return res.data.data;
};

export const getTaskActivities = async (taskId) => {
  const res = await api.get(`/activities/${taskId}`);

  return res.data.data;
};

export const getTaskComments = async (taskId) => {
  const res = await api.get(`/comments/${taskId}`);

  return res.data.data;
};

export const createTaskComment = async (taskId, data) => {
  const res = await api.post(`/comments/${taskId}`, data);

  return res.data;
};
