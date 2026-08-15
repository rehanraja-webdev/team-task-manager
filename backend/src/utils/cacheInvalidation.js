import cacheHelper from "./cacheHelper.js";

const cacheInvalidation = {
  project: async (projectId) => {
    await Promise.all([
      cacheHelper.delete(`project_${projectId}`),
      cacheHelper.deleteByPrefix(`project_${projectId}_`),
      cacheHelper.deleteByPrefix(`tasks_${projectId}`),
      cacheHelper.deleteByPrefix(`dashboard_`),
    ]);
  },

  task: async (projectId) => {
    await Promise.all([
      cacheHelper.deleteByPrefix(`tasks_${projectId}`),
      cacheHelper.deleteByPrefix(`dashboard_`),
    ]);
  },

  user: async (userId) => {
    await Promise.all([
      cacheHelper.delete(`user_${userId}`),
      cacheHelper.delete(`dashboard_${userId}`),
    ]);
  },
};

export default cacheInvalidation;
