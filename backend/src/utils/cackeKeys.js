export const cacheKeys = {
  project: (id) => `project:${id}`,
  projectTasks: (id) => `project:${id}:tasks`,
  projectMembers: (id) => `project:${id}:members`,
  dashboard: (id) => `dashboard:${id}`,
  user: (id) => `user:${id}`,
};
