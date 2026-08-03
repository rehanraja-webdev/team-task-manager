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
      $sortByCount: "$project",
    },
    {
      $limit: 3,
    },
    {
      // Join with the 'projects' collection
      $lookup: {
        from: "projects", // Collection name in MongoDB (usually lowercase plural)
        localField: "_id",
        foreignField: "_id",
        as: "projectDetails",
      },
    },
    {
      // Unwind the array returned by $lookup
      $unwind: "$projectDetails",
    },
    {
      // Format the output structure
      $project: {
        _id: 0,
        projectName: "$projectDetails.name",
        taskCount: "$count",
      },
    },
  ]);

  cacheHelper.setCache(cacheKey, projectStats);

  res
    .status(200)
    .json(new ApiResponse(200, "Project Stats fetched!", projectStats));
});

export default { analyticsOverview, monthlyTask, projectProgress };
