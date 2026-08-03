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
  const cacheKey = "monthly_tasks";
  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Monthly task fetched from cache", cached.data),
      );
  } else {
    console.log("Cache Miss:", cacheKey);
    cacheHelper.deleteCache(cacheKey);
  }
  const monthlyTasks = await Task.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        tasks: { $sum: 1 },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyChart = monthlyTasks.map((item) => ({
    month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
    tasks: item.tasks,
  }));

  cacheHelper.setCache(cacheKey, monthlyChart);

  res
    .status(200)
    .json(new ApiResponse(200, "monthly tasks fetched!", monthlyChart));
});

const projectProgress = asyncHandler(async (req, res) => {
  const cacheKey = "analytics_progress";
  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Project progress fetched from cache",
          cached.data,
        ),
      );
  } else {
    console.log("Cache Miss:", cacheKey);
    cacheHelper.deleteCache(cacheKey);
  }

  const projectStats = await Task.aggregate([
    {
      $group: {
        _id: "$project",
        tasks: { $sum: 1 },
        completedTasks: {
          $sum: {
            $cond: [{ $eq: ["$status", "done"] }, 1, 0],
          },
        },
      },
    },
    {
      $addFields: {
        completionRate: {
          $cond: [
            { $eq: ["$tasks", 0] },
            0,
            { $multiply: [{ $divide: ["$completedTasks", "$tasks"] }, 100] },
          ],
        },
      },
    },
    {
      $sort: { tasks: -1 },
    },
    {
      $limit: 3,
    },
    {
      $lookup: {
        from: "projects",
        localField: "_id",
        foreignField: "_id",
        as: "projectDetails",
      },
    },
    {
      $unwind: "$projectDetails",
    },
    {
      $project: {
        _id: 0,
        project: "$projectDetails.name",
        tasks: 1,
        completionRate: { $round: "$completionRate" },
      },
    },
  ]);

  cacheHelper.setCache(cacheKey, projectStats);

  res
    .status(200)
    .json(new ApiResponse(200, "Project Stats fetched!", projectStats));
});

const getTopContributors = asyncHandler(async (req, res) => {
  const contributors = await Task.aggregate([
    {
      $match: {
        status: "done",
      },
    },
    {
      $group: {
        _id: "$assignedTo",
        completedTasks: { $sum: 1 },
      },
    },
    {
      $sort: {
        completedTasks: -1,
      },
    },
    {
      $limit: 10,
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        _id: 0,
        fullname: "$user.fullname",
        email: "$user.email",
        completedTasks: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, "Top contributors fetched", contributors));
});

const getOverdueTasks = asyncHandler(async (req, res) => {
  const overdueTasks = await Task.aggregate([
    {
      $match: {
        dueDate: {
          $lt: new Date(),
        },
        status: {
          $ne: "done",
        },
      },
    },
    {
      $sort: {
        dueDate: 1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "assignedTo",
        foreignField: "_id",
        as: "assignedUser",
      },
    },
    {
      $unwind: "$assignedUser",
    },
    {
      $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "_id",
        as: "project",
      },
    },
    {
      $unwind: "$project",
    },
    {
      $project: {
        _id: 1,
        title: 1,
        dueDate: 1,
        priority: 1,
        status: 1,
        assignedTo: "$assignedUser.fullname",
        project: "$project.name",
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, "Overdue tasks fetched", overdueTasks));
});

export default {
  analyticsOverview,
  monthlyTask,
  projectProgress,
  getTopContributors,
  getOverdueTasks,
};
