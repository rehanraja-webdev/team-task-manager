import cacheHelper from "./cache.helper.js";
import cacheKeys from "./cacheKeys.js";

const cacheInvalidation = {
  comment: async (userId, taskId) => {
    await cacheHelper.deleteCache(cacheKeys.comments(userId, taskId));
  },

  // =========================================================
  // PROJECT
  // =========================================================

  /**
   * Project created
   * Affects:
   * - Project list
   * - Dashboard project count/statistics
   * - Analytics project count/statistics
   */
  projectCreated: async (userId) => {
    await Promise.all([
      cacheHelper.deleteByPrefix(cacheKeys.projectsPrefix(userId)),
      cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
      cacheHelper.deleteCache(cacheKeys.analytics(userId)),
    ]);
  },

  /**
   * Project updated
   * Affects:
   * - Project details
   * - Project list
   * - Dashboard/analytics if project-level data is displayed
   */
  projectUpdated: async (projectId, userId) => {
    await Promise.all([
      cacheHelper.deleteCache(cacheKeys.project(projectId)),
      cacheHelper.deleteCache(cacheKeys.projects(userId)),
      cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
      cacheHelper.deleteCache(cacheKeys.analytics(userId)),
    ]);
  },

  /**
   * Project deleted
   * Affects:
   * - Project details
   * - Project list
   * - Project tasks
   * - Dashboard
   * - Analytics
   */
  projectDeleted: async (projectId, userId) => {
    await Promise.all([
      cacheHelper.deleteCache(cacheKeys.project(projectId)),
      cacheHelper.deleteCache(cacheKeys.projects(userId)),
      cacheHelper.deleteByPrefix(cacheKeys.projectPrefix(projectId)),
      cacheHelper.deleteByPrefix(cacheKeys.tasks(projectId)),
      cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
      cacheHelper.deleteCache(cacheKeys.analytics(userId)),
    ]);
  },

  /**
   * Generic project invalidation
   * Useful when the project itself or related project data changes.
   */
  project: async (projectId, userId) => {
    await Promise.all([
      cacheHelper.deleteCache(cacheKeys.project(projectId)),

      cacheHelper.deleteByPrefix(cacheKeys.projectPrefix(projectId)),

      cacheHelper.deleteByPrefix(cacheKeys.tasks(projectId)),

      cacheHelper.deleteByPrefix(cacheKeys.projectsPrefix(userId)),

      cacheHelper.deleteCache(cacheKeys.members(userId, projectId)),

      cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
      cacheHelper.deleteCache(cacheKeys.analytics(userId)),
    ]);
  },

  // =========================================================
  // PROJECT MEMBERS
  // =========================================================

  /**
   * Member added to project
   */
  memberAdded: async (projectId, userIds = []) => {
    const uniqueUserIds = [...new Set(userIds.map(String))];

    await Promise.all([
      cacheHelper.deleteCache(cacheKeys.project(projectId)),

      ...uniqueUserIds.flatMap((userId) => [
        cacheHelper.deleteByPrefix(cacheKeys.projectsPrefix(userId)),
        cacheHelper.deleteCache(cacheKeys.members(userId, projectId)),
        cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
        cacheHelper.deleteCache(cacheKeys.analytics(userId)),
        cacheHelper.deleteCache(cacheKeys.projectUsers(userId)),
      ]),
    ]);
  },

  memberRemoved: async (projectId, userIds = []) => {
    const uniqueUserIds = [...new Set(userIds.map(String))];

    await Promise.all([
      cacheHelper.deleteCache(cacheKeys.project(projectId)),

      ...uniqueUserIds.flatMap((userId) => [
        cacheHelper.deleteByPrefix(cacheKeys.projectsPrefix(userId)),
        cacheHelper.deleteCache(cacheKeys.members(userId, projectId)),
        cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
        cacheHelper.deleteCache(cacheKeys.analytics(userId)),
        cacheHelper.deleteCache(cacheKeys.projectUsers(userId)),
      ]),

      cacheHelper.deleteByPrefix(cacheKeys.tasks(projectId)),
    ]);
  },

  /**
   * Project members changed.
   * Useful when multiple members are added/removed at once.
   */
  membersChanged: async (projectId, userIds = []) => {
    const uniqueUserIds = [...new Set(userIds.map(String))];

    await Promise.all([
      cacheHelper.deleteCache(cacheKeys.project(projectId)),
      cacheHelper.deleteByPrefix(cacheKeys.projectPrefix(projectId)),

      ...uniqueUserIds.flatMap((userId) => [
        cacheHelper.deleteCache(cacheKeys.projects(userId)),
        cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
        cacheHelper.deleteCache(cacheKeys.analytics(userId)),
      ]),
    ]);
  },

  notifications: async (userId) => {
    await cacheHelper.deleteCache(cacheKeys.notifications(userId));
  },

  // =========================================================
  // TASK
  // =========================================================

  /**
   * Task created
   */
  taskCreated: async (projectId, userIds = []) => {
    const uniqueUserIds = [...new Set(userIds.map(String))];

    await Promise.all([
      cacheHelper.deleteByPrefix(`project_tasks_${projectId}_`),

      ...uniqueUserIds.flatMap((userId) => [
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "default")),
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "assigned")),
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "created")),
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "all")),

        cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
        cacheHelper.deleteCache(cacheKeys.analytics(userId)),
      ]),
    ]);
  },

  taskUpdated: async (projectId, userIds = []) => {
    const uniqueUserIds = [...new Set(userIds.map(String))];

    await Promise.all([
      cacheHelper.deleteByPrefix(`project_tasks_${projectId}_`),

      ...uniqueUserIds.flatMap((userId) => [
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "default")),
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "assigned")),
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "created")),
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "all")),

        cacheHelper.deleteCache(cacheKeys.task(userId, projectId)),
        cacheHelper.deleteByPrefix(`task_${userId}`),

        cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
        cacheHelper.deleteCache(cacheKeys.analytics(userId)),
      ]),
    ]);
  },

  taskDeleted: async (projectId, userIds = []) => {
    const uniqueUserIds = [...new Set(userIds.map(String))];

    await Promise.all([
      cacheHelper.deleteByPrefix(`project_tasks_${projectId}_`),

      ...uniqueUserIds.flatMap((userId) => [
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "default")),
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "assigned")),
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "created")),
        cacheHelper.deleteCache(cacheKeys.userTasks(userId, "all")),

        cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
        cacheHelper.deleteCache(cacheKeys.analytics(userId)),
      ]),
    ]);
  },

  task: async (projectId, userIds = []) => {
    const uniqueUserIds = [...new Set(userIds.map(String))];

    await Promise.all([
      cacheHelper.deleteByPrefix(cacheKeys.tasks(projectId)),

      ...uniqueUserIds.flatMap((userId) => [
        cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
        cacheHelper.deleteCache(cacheKeys.analytics(userId)),
      ]),
    ]);
  },

  // =========================================================
  // USER
  // =========================================================

  /**
   * User information changed
   */
  user: async (userId) => {
    await Promise.all([
      cacheHelper.deleteCache(cacheKeys.user(userId)),
      cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
      cacheHelper.deleteCache(cacheKeys.analytics(userId)),
      cacheHelper.deleteCache(cacheKeys.projects(userId)),
    ]);
  },

  /**
   * User profile updated
   */
  userUpdated: async (userId) => {
    await Promise.all([
      cacheHelper.deleteCache(cacheKeys.user(userId)),
      cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
      cacheHelper.deleteCache(cacheKeys.analytics(userId)),
    ]);
  },

  // =========================================================
  // DASHBOARD
  // =========================================================

  dashboard: async (userId) => {
    await cacheHelper.deleteCache(cacheKeys.dashboard(userId));
  },

  /**
   * Use only when you intentionally need to invalidate
   * dashboards for multiple users.
   */
  dashboards: async (userIds = []) => {
    const uniqueUserIds = [...new Set(userIds.map(String))];

    await Promise.all(
      uniqueUserIds.map((userId) =>
        cacheHelper.deleteCache(cacheKeys.dashboard(userId)),
      ),
    );
  },

  /**
   * Global dashboard invalidation.
   * Avoid unless absolutely necessary.
   */
  allDashboards: async () => {
    await cacheHelper.deleteByPrefix(cacheKeys.dashboardPrefix());
  },

  //Activities
  activity: async (userId, taskId) => {
    await Promise.all([
      cacheHelper.deleteCache(cacheKeys.taskActivities(userId, taskId)),
      cacheHelper.deleteByPrefix(cacheKeys.activitiesPrefix(userId)),
    ]);
  },

  taskActivities: async (userId, taskId) => {
    await cacheHelper.deleteCache(cacheKeys.taskActivities(userId, taskId));
  },

  activities: async (userId) => {
    await cacheHelper.deleteByPrefix(cacheKeys.activitiesPrefix(userId));
  },

  // =========================================================
  // ANALYTICS
  // =========================================================

  analytics: async (userId) => {
    await cacheHelper.deleteCache(cacheKeys.analytics(userId));
  },

  analyticsForUsers: async (userIds = []) => {
    const uniqueUserIds = [...new Set(userIds.map(String))];

    await Promise.all(
      uniqueUserIds.map((userId) =>
        cacheHelper.deleteCache(cacheKeys.analytics(userId)),
      ),
    );
  },

  projectUsers: async (userId) => {
    await cacheHelper.deleteCache(cacheKeys.projectUsers(userId));
  },
};

export default cacheInvalidation;
