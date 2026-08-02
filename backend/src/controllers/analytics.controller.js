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

  const totalUsers = await User.countDocuments();
  const totalProjects = await Project.countDocuments();
  const totalTasks = await Task.countDocuments();

  const userStats = await User.aggregate([
    {
      $group: {
        _id: "$role",
        count: { $sum: 1 },
      },
    },
  ]);

  let totalMembers = 0;
  let totalAdmins = 0;

  userStats.map((user) => {
    if (user._id === "member") {
      totalMembers = user.count;
    } else if (user._id === "admin") {
      totalAdmins = user.count;
    }
  });

  const taskStats = await Task.aggregate([
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
  ]);

  const statusCounts = Object.fromEntries(
    taskStats[0].byStatus.map(({ _id, count }) => [_id, count]),
  );

  const priorityCounts = Object.fromEntries(
    taskStats[0].byPriority.map(({ _id, count }) => [_id, count]),
  );

  const todoTasks = statusCounts.todo || 0;
  const inProgressTasks = statusCounts["in-progress"] || 0;
  const doneTasks = statusCounts.done || 0;

  const lowPriority = priorityCounts.low || 0;
  const mediumPriority = priorityCounts.medium || 0;
  const highPriority = priorityCounts.high || 0;

  cacheHelper.setCache(cacheKey, {
    totalUsers,
    totalAdmins,
    totalMembers,
    totalProjects,
    totalTasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    lowPriority,
    mediumPriority,
    highPriority,
  });

  res.status(200).json(
    new ApiResponse(200, "analytics", {
      totalUsers,
      totalAdmins,
      totalMembers,
      totalProjects,
      totalTasks,
      todoTasks,
      inProgressTasks,
      doneTasks,
      lowPriority,
      mediumPriority,
      highPriority,
    }),
  );
});

export default { analyticsOverview };
