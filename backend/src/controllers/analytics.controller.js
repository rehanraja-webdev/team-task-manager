import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import cacheHelper from "../utils/cache.helper.js";
import cacheKeys from "../utils/cacheKeys.js";

const getAnalytics = asyncHandler(async (req, res) => {
  const adminId = req.user._id;
  const key = cacheKeys.analytics(adminId);

  const cached = cacheHelper.getCache(key);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Analytics fetched from cache", cached.data));
  }

  if (cached) {
    cacheHelper.deleteCache(key);
  }

  // Check projects first.
  // A new admin has no analytics to calculate.
  const projects = await Project.find({
    owner: adminId,
  })
    .select("_id")
    .lean();

  if (projects.length === 0) {
    const emptyData = {
      isEmpty: true,
    };

    cacheHelper.setCache(key, emptyData);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Welcome to TeamTask! Create your first project to view analytics.",
          emptyData,
        ),
      );
  }

  const projectIds = projects.map((project) => project._id);

  const [
    taskStats,
    memberStats,
    monthlyTasks,
    projectAnalytics,
    contributors,
    overdue,
  ] = await Promise.all([
    // Task overview
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

    // Unique members across admin's projects
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

    // Tasks created per month
    Task.aggregate([
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
          tasks: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]),

    // Top projects
    Task.aggregate([
      {
        $match: {
          project: { $in: projectIds },
        },
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
        $group: {
          _id: "$project._id",
          project: { $first: "$project.name" },
          tasks: { $sum: 1 },
          completed: {
            $sum: {
              $cond: [{ $eq: ["$status", "done"] }, 1, 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          project: 1,
          tasks: 1,
          completionRate: {
            $round: [
              {
                $multiply: [
                  {
                    $divide: ["$completed", "$tasks"],
                  },
                  100,
                ],
              },
              0,
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
    ]),

    // Top contributors
    Task.aggregate([
      {
        $match: {
          project: { $in: projectIds },
        },
      },
      {
        $group: {
          _id: "$assignedTo",
          assignedTasks: { $sum: 1 },
          completedTasks: {
            $sum: {
              $cond: [{ $eq: ["$status", "done"] }, 1, 0],
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
          assignedTasks: 1,
          completedTasks: 1,
        },
      },
    ]),

    // Overdue tasks
    Task.aggregate([
      {
        $match: {
          project: { $in: projectIds },
          dueDate: { $lt: new Date() },
          status: { $ne: "done" },
        },
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
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $sort: {
          dueDate: 1,
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          dueDate: 1,
          priority: 1,
          status: 1,
          project: "$project.name",
          assignedTo: "$user.fullname",
        },
      },
    ]),
  ]);

  const stats = taskStats[0];

  const overview = stats.overview[0] || {};

  const status = Object.fromEntries(
    stats.byStatus.map((item) => [item._id, item.count]),
  );

  const priority = Object.fromEntries(
    stats.byPriority.map((item) => [item._id, item.count]),
  );

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

  const data = {
    isEmpty: false,

    overview: {
      totalProjects: projectIds.length,
      totalMembers: memberStats[0]?.totalMembers || 0,
      totalTasks: overview.totalTasks || 0,
      todoTasks: status.todo || 0,
      inProgressTasks: status["in-progress"] || 0,
      doneTasks: status.done || 0,

      completionRate:
        overview.totalTasks > 0
          ? Math.round(((status.done || 0) / overview.totalTasks) * 100)
          : 0,

      overdueTasks: overview.overdueTasks || 0,
      lowPriority: priority.low || 0,
      mediumPriority: priority.medium || 0,
      highPriority: priority.high || 0,
    },

    monthTasks: monthlyTasks.map((item) => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      tasks: item.tasks,
    })),

    projectAnalytics,
    contributors,
    overdue,
  };

  cacheHelper.setCache(key, data);

  return res.status(200).json(new ApiResponse(200, "Analytics fetched", data));
});

export default { getAnalytics };
