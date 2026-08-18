import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import cacheHelper from "../utils/cache.helper.js";
import Activity from "../models/activity.model.js";
import cacheKeys from "../utils/cacheKeys.js";

const getAdminDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const key = cacheKeys.dashboard(userId);
  const cached = cacheHelper.getCache(key);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Dashboard fetched from cache", cached.data));
  }

  // Only fetch projects first.
  const projects = await Project.find({
    owner: userId,
  }).select("_id");

  // New admin / no projects yet
  if (projects.length === 0) {
    const dashboardData = {
      isEmpty: true,
    };

    cacheHelper.setCache(key, dashboardData);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Welcome to TeamTask! Create your first project.",
          dashboardData,
        ),
      );
  }

  const projectIds = projects.map((project) => project._id);

  const totalProjects = projects.length;

  const [totalTasks, taskStats, myAssignedTasks] = await Promise.all([
    Task.countDocuments({
      project: { $in: projectIds },
    }),

    Task.aggregate([
      {
        $match: {
          project: { $in: projectIds },
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]),

    Task.countDocuments({
      assignedTo: userId,
      project: { $in: projectIds },
    }),
  ]);

  // Get task IDs belonging to the admin's projects
  const projectTaskIds = await Task.find({
    project: { $in: projectIds },
  }).distinct("_id");

  // Get both project-level and task-level activities
  const activities = await Activity.find({
    $or: [
      {
        project: { $in: projectIds },
      },
      {
        task: { $in: projectTaskIds },
      },
    ],
  })
    .populate("user", "fullname email")
    .sort({ createdAt: -1 })
    .limit(10);

  let todoTasks = 0;
  let inProgressTasks = 0;
  let doneTasks = 0;

  taskStats.forEach((item) => {
    if (item._id === "todo") {
      todoTasks = item.count;
    }

    if (item._id === "in-progress") {
      inProgressTasks = item.count;
    }

    if (item._id === "done") {
      doneTasks = item.count;
    }
  });

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  const dashboardData = {
    isEmpty: false,
    totalProjects,
    totalTasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    completionRate,
    myAssignedTasks,
    activities,
  };

  cacheHelper.setCache(key, dashboardData);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Dashboard stats fetched successfully",
        dashboardData,
      ),
    );
});

const getMemberDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const key = cacheKeys.dashboard(userId);
  const cached = cacheHelper.getCache(key);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Member dashboard fetched from cache",
          cached.data,
        ),
      );
  }

  const hasTasks = await Task.exists({
    assignedTo: userId,
  });

  const hasProjects = await Project.exists({
    "members.user": userId,
  });

  if (!hasTasks && !hasProjects) {
    const dashboardData = {
      isEmpty: true,
    };

    cacheHelper.setCache(key, dashboardData);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Welcome to TeamTask! You don't have any assigned work yet.",
          dashboardData,
        ),
      );
  }

  // Check membership FIRST.
  // This prevents expensive task queries for a new member.
  const projects = await Project.find({
    "members.user": userId,
  })
    .select("name status createdAt")
    .sort({ createdAt: -1 });

  // New member / not part of any project
  if (projects.length === 0) {
    const dashboardData = {
      isEmpty: true,
    };

    cacheHelper.setCache(key, dashboardData);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Welcome to TeamTask! You are not part of any project yet.",
          dashboardData,
        ),
      );
  }

  const taskStats = await Task.aggregate([
    {
      $match: {
        assignedTo: userId,
      },
    },
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

        dueToday: [
          {
            $match: {
              dueDate: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lte: new Date(new Date().setHours(23, 59, 59, 999)),
              },
            },
          },
          {
            $count: "count",
          },
        ],
      },
    },
  ]);

  let assignedTasks = 0;
  let completedTasks = 0;
  let inProgressTasks = 0;
  let todoTasks = 0;
  let dueToday = 0;

  taskStats[0].byStatus.forEach((item) => {
    assignedTasks += item.count;

    if (item._id === "todo") {
      todoTasks = item.count;
    }

    if (item._id === "in-progress") {
      inProgressTasks = item.count;
    }

    if (item._id === "done") {
      completedTasks = item.count;
    }
  });

  if (taskStats[0].dueToday.length > 0) {
    dueToday = taskStats[0].dueToday[0].count;
  }

  const completionRate =
    assignedTasks === 0
      ? 0
      : Math.round((completedTasks / assignedTasks) * 100);

  const upcomingTasks = await Task.find({
    assignedTo: userId,
    status: { $ne: "done" },
  })
    .select("title priority dueDate status")
    .sort({ dueDate: 1 })
    .limit(5);

  const recentActivities = await Activity.find({
    user: userId,
  })
    .populate("user", "fullname email")
    .sort({ createdAt: -1 })
    .limit(8);

  const dashboardData = {
    isEmpty: false,
    assignedTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    dueToday,
    completionRate,
    projects,
    upcomingTasks,
    recentActivities,
  };

  cacheHelper.setCache(key, dashboardData);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Member dashboard fetched successfully",
        dashboardData,
      ),
    );
});

export default { getAdminDashboard, getMemberDashboard };
