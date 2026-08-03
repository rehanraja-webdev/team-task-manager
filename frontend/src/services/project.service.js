import api from "../api/axios";

export const getProjects = async () => {
  const response = await api.get("/v1/projects");
  return response.data.data;
};

export const getProject = async (projectId) => {
  const response = await api.get(`/v1/projects/${projectId}`);
  return response.data.data;
};

export const getProjectMembers = async (projectId) => {
  const response = await api.get(`/v1/projects/${projectId}/members`);

  return response.data.data;
};

export const getProjectTasks = async (projectId, queryParams) => {
  const response = await api.get(`/tasks/project/${projectId}?${queryParams}`);
  return response.data.data || [];
};

export const createAProject = async (formData) => {
  await api.post("/v1/projects", formData);
  return;
};

export const addNewMember = async (id, email) => {
  await api.post(`/v1/projects/${id}/member`, { email });
};

export const deleteProjectById = async (id) => {
  await api.delete(`/v1/projects/${id}`);
  return;
};

export const removeMember = async (projectId, memberId) => {
  await api.delete(`/v1/projects/${projectId}/members/${memberId}`);
};

export const updateProjectById = async (projectId, formData) => {
  await api.patch(`/v1/projects/${projectId}`, formData);
};
