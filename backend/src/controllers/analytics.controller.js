import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import cacheHelper from "../utils/cache.helper.js";

const analyticsOverview = asyncHandler(async (req, res) => {
  const adminId = req.user._id;

  const cacheKey = `admin_analytics_overview_${adminId}`;

  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Admin analytics overview fetched from cache",
          cached.data,
        ),
      );
  }

  console.log("Cache Miss:", cacheKey);
  cacheHelper.deleteCache(cacheKey);

  const projects = await Project.find({
    owner: adminId,
  }).select("_id");

  const projectIds = projects.map((project) => project._id);

  if (!projectIds.length) {
    const data = {
      totalProjects: 0,
      totalMembers: 0,
      totalTasks: 0,
      todoTasks: 0,
      inProgressTasks: 0,
      doneTasks: 0,
      overdueTasks: 0,
      lowPriority: 0,
      mediumPriority: 0,
      highPriority: 0,
    };

    cacheHelper.setCache(cacheKey, data);

    return res
      .status(200)
      .json(new ApiResponse(200, "Admin analytics overview fetched", data));
  }

  const [taskStats, memberStats] = await Promise.all([
    Task.aggregate([
      {
        $match: {
          project: { $in: projectIds },
        },
      },

      {
        $facet: {
          overview: [
            {
              $group: {
                _id: null,
                totalTasks: { $sum: 1 },

                overdueTasks: {
                  $sum: {
                    $cond: [
                      {
                        $and: [
                          { $lt: ["$dueDate", new Date()] },
                          { $ne: ["$status", "done"] },
                        ],
                      },
                      1,
                      0,
                    ],
                  },
                },
              },
            },
          ],

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

    Project.aggregate([
      {
        $match: {
          owner: adminId,
        },
      },

      {
        $unwind: "$members",
      },

      {
        $group: {
          _id: "$members.user",
        },
      },

      {
        $count: "totalMembers",
      },
    ]),
  ]);

  const stats = taskStats[0];

  const overview = stats.overview[0] || {};

  const statusCounts = Object.fromEntries(
    stats.byStatus.map(({ _id, count }) => [_id, count]),
  );

  const todoTasks = statusCounts.todo || 0;

  const inProgressTasks = statusCounts["in-progress"] || 0;

  const doneTasks = statusCounts.done || 0;

  const priorityCounts = Object.fromEntries(
    stats.byPriority.map(({ _id, count }) => [_id, count]),
  );

  const lowPriority = priorityCounts.low || 0;

  const mediumPriority = priorityCounts.medium || 0;

  const highPriority = priorityCounts.high || 0;

  const totalTasks = overview.totalTasks || 0;

  const completionRate =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const data = {
    totalProjects: projectIds.length,
    totalMembers: memberStats[0]?.totalMembers || 0,
    totalTasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    completionRate,
    overdueTasks: overview.overdueTasks || 0,
    lowPriority,
    mediumPriority,
    highPriority,
  };

  cacheHelper.setCache(cacheKey, data);

  return res
    .status(200)
    .json(new ApiResponse(200, "Admin analytics overview fetched", data));
});

const monthlyTask = asyncHandler(async (req, res) => {
  const adminId = req.user._id;

  const cacheKey = `admin_monthly_tasks_${adminId}`;

  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Monthly tasks fetched from cache", cached.data),
      );
  }

  console.log("Cache Miss:", cacheKey);
  cacheHelper.deleteCache(cacheKey);

  const projects = await Project.find({
    owner: adminId,
  }).select("_id");

  const projectIds = projects.map((project) => project._id);

  if (!projectIds.length) {
    cacheHelper.setCache(cacheKey, []);

    return res
      .status(200)
      .json(new ApiResponse(200, "Monthly tasks fetched", []));
  }

  const monthlyTasks = await Task.aggregate([
    {
      $match: {
        project: { $in: projectIds },
      },
    },

    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },

        tasks: {
          $sum: 1,
        },
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

  return res
    .status(200)
    .json(new ApiResponse(200, "Monthly tasks fetched", monthlyChart));
});

const projectProgress = asyncHandler(async (req, res) => {
  const adminId = req.user._id;

  const cacheKey = `admin_project_progress_${adminId}`;

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
  }

  console.log("Cache Miss:", cacheKey);
  cacheHelper.deleteCache(cacheKey);

  const projectStats = await Task.aggregate([
    {
      $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "_id",
        as: "projectDetails",
      },
    },

    {
      $unwind: "$projectDetails",
    },

    {
      $match: {
        "projectDetails.owner": adminId,
      },
    },

    {
      $group: {
        _id: "$project",

        tasks: {
          $sum: 1,
        },

        completedTasks: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "done"],
              },
              1,
              0,
            ],
          },
        },

        projectName: {
          $first: "$projectDetails.name",
        },
      },
    },

    {
      $addFields: {
        completionRate: {
          $cond: [
            {
              $eq: ["$tasks", 0],
            },

            0,

            {
              $multiply: [
                {
                  $divide: ["$completedTasks", "$tasks"],
                },

                100,
              ],
            },
          ],
        },
      },
    },

    {
      $sort: {
        tasks: -1,
      },
    },

    {
      $limit: 3,
    },

    {
      $project: {
        _id: 0,

        project: "$projectName",

        tasks: 1,

        completionRate: {
          $round: "$completionRate",
        },
      },
    },
  ]);

  cacheHelper.setCache(cacheKey, projectStats);

  return res
    .status(200)
    .json(new ApiResponse(200, "Project stats fetched", projectStats));
});

const getTopContributors = asyncHandler(async (req, res) => {
  const adminId = req.user._id;

  const cacheKey = `admin_top_contributors_${adminId}`;

  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Top contributors fetched from cache",
          cached.data,
        ),
      );
  }

  console.log("Cache Miss:", cacheKey);
  cacheHelper.deleteCache(cacheKey);

  const contributors = await Task.aggregate([
    {
      $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "_id",
        as: "projectDetails",
      },
    },

    {
      $unwind: "$projectDetails",
    },

    {
      $match: {
        "projectDetails.owner": adminId,
      },
    },

    {
      $group: {
        _id: "$assignedTo",

        assignedTasks: {
          $sum: 1,
        },

        completedTasks: {
          $sum: {
            $cond: [
              {
                $eq: ["$status", "done"],
              },
              1,
              0,
            ],
          },
        },
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

        assignedTasks: 1,
      },
    },
  ]);

  cacheHelper.setCache(cacheKey, contributors);

  return res
    .status(200)
    .json(new ApiResponse(200, "Top contributors fetched", contributors));
});

const getOverdueTasks = asyncHandler(async (req, res) => {
  const adminId = req.user._id;

  const cacheKey = `admin_overdue_tasks_${adminId}`;

  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Overdue tasks fetched from cache", cached.data),
      );
  }

  console.log("Cache Miss:", cacheKey);
  cacheHelper.deleteCache(cacheKey);

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
      $lookup: {
        from: "projects",
        localField: "project",
        foreignField: "_id",
        as: "projectDetails",
      },
    },

    {
      $unwind: "$projectDetails",
    },

    {
      $match: {
        "projectDetails.owner": adminId,
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
      $project: {
        _id: 1,

        title: 1,

        dueDate: 1,

        priority: 1,

        status: 1,

        assignedTo: "$assignedUser.fullname",

        project: "$projectDetails.name",
      },
    },
  ]);

  cacheHelper.setCache(cacheKey, overdueTasks);

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
