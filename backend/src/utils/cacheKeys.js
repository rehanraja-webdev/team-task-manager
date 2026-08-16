const cacheKeys = {
  project: (projectId) => `project_${projectId}`,
  projectPrefix: (projectId) => `project_${projectId}_`,

  projects: (userId) => `projects_${userId}`,
  projectsPrefix: (userId) => `projects_${userId}_`,

  members: (userId, projectId) => `members_${userId}_${projectId}`,

  tasks: (projectId) => `tasks_${projectId}`,

  dashboard: (userId) => `dashboard_${userId}`,
  dashboardPrefix: () => `dashboard_`,

  user: (userId) => `user_${userId}`,

  analytics: (userId) => `analytics_${userId}`,
};

export default cacheKeys;
