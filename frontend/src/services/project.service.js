import api from "../api/axios";

export const getProjects = async () => {
  const response = await api.get("/v1/projects");
  return response.data.data;
};

export const getProject = async (id) => {
  const response = await api.get(`/v1/projects/${id}`);
  return response.data.data;
};
