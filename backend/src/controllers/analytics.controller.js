import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import cacheHelper from "../utils/cache.helper.js";

const analyticsOverview = asyncHandler(async (req, res) => {
  const cacheKey = "analytics_overview";
  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);
    return res
      .status(200)
      .json(new ApiResponse(200, "Overview fetched from cache", cached.data));
  } else {
    console.log("Cache Miss:", cacheKey);
    cacheHelper.deleteCache(cacheKey);
  }

  const [totalUsers, totalProjects, totalTasks, overdueTasks, taskStats] =
    await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Task.countDocuments(),
      Task.countDocuments({
        dueDate: { $lt: new Date() },
        status: { $ne: "done" },
      }),
      Task.aggregate([
        {
          $facet: {
            byStatus: [
              {
                $group: {
                  _id: "$status",
                  count: { $sum: 1 },
                },
              },
            ],
            byPriority: [
              {
                $group: {
                  _id: "$priority",
                  count: { $sum: 1 },
                },
              },
            ],
          },
        },
      ]),
    ]);

  const statusCounts = Object.fromEntries(
    taskStats[0].byStatus.map(({ _id, count }) => [_id, count]),
  );

  const todoTasks = statusCounts.todo || 0;
  const inProgressTasks = statusCounts["in-progress"] || 0;
  const doneTasks = statusCounts.done || 0;

  const priorityCounts = Object.fromEntries(
    taskStats[0].byPriority.map(({ _id, count }) => [_id, count]),
  );

  const lowPriority = priorityCounts.low || 0;
  const mediumPriority = priorityCounts.medium || 0;
  const highPriority = priorityCounts.high || 0;

  cacheHelper.setCache(cacheKey, {
    totalUsers,
    totalProjects,
    totalTasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    overdueTasks,
    lowPriority,
    mediumPriority,
    highPriority,
  });

  res.status(200).json(
    new ApiResponse(200, "analytics overview fetched!", {
      totalUsers,
      totalProjects,
      totalTasks,
      todoTasks,
      inProgressTasks,
      doneTasks,
      overdueTasks,
      lowPriority,
      mediumPriority,
      highPriority,
    }),
  );
});

const monthlyTask = asyncHandler(async (req, res) => {
  const stats = await Task.aggregate([
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
  ]);

  const statsMap = Object.fromEntries(
    stats.map(({ _id, count }) => [_id.month, count]),
  );

  const monthlyCount = Array.from({ length: 12 }, (_, i) => i + 1).reduce(
    (acc, month) => {
      acc[month] = statsMap[month] || 0;
      return acc;
    },
    {},
  );

  res
    .status(200)
    .json(new ApiResponse(200, "monthly tasks fetched!", monthlyCount));
});

export default { analyticsOverview, monthlyTask };
