const cacheKeys = {
  project: (projectId) => `project_${projectId}`,
  projectPrefix: (projectId) => `project_${projectId}_`,
  projects: (userId) => `projects_${userId}`,
  projectsPrefix: (userId) => `projects_${userId}`,

  members: (userId, projectId) => `members_${userId}_${projectId}`,

  tasks: (projectId) => `tasks_${projectId}`,
  userTasks: (userId, view = "default") => `tasks_${userId}_${view}`,
  task: (userId, taskId) => `task_${userId}_${taskId}`,
  projectTasks: (projectId, query = "") =>
    `project_tasks_${projectId}_${query}`,
  projectTasksPrefix: (projectId) => `project_tasks_${projectId}_`,

  dashboard: (userId) => `dashboard_${userId}`,
  dashboardPrefix: () => `dashboard_`,

  user: (userId) => `user_${userId}`,

  //Activitties
  taskActivities: (userId, taskId) => `activities_${userId}_${taskId}`,
  activities: (userId, page, limit) => `activities_${userId}_${page}_${limit}`,
  activitiesPrefix: (userId) => `activities_${userId}_`,

  analytics: (userId) => `analytics_${userId}`,
  analyticsPrefix: () => `analytics_`,

  userSettings: (userId) => `user_settings_${userId}`,
};

export default cacheKeys;
