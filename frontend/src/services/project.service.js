import api from "../api/axios";

export const getProjects = async () => {
  const response = await api.get("/v1/projects");
  return response.data.data;
};

export const createAProject = async (formData) => {
  const response = await api.post("/v1/projects", formData);
  return response.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/v1/projects/${id}`);
  return response.data.data;
};

export const deleteProjectById = async (id) => {
  const response = await api.delete(`/v1/projects/${id}`);
  return response.data;
};

export const addNewMember = async (id, email) => {
  const response = await api.post(`/v1/projects/${id}/member`, {email});
  return response.data;
};
