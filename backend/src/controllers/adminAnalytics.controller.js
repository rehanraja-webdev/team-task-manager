import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import User from "../models/user.model.js";
import cacheHelper from "../utils/cache.helper.js";

const getAdminAnalytics = asyncHandler(async (req, res) => {
  const adminId = req.user._id;

  const cacheKey = `adminAnalytics${adminId}`;

  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Admin analytics fetched from cache", cached.data),
      );
  } else {
    console.log("Cache Miss:", cacheKey);
    cacheHelper.deleteCache(cacheKey);
  }

  const memberStats = await Project.aggregate([
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
  ]);

  const totalMembers = memberStats[0]?.totalMembers || 0;

  const projects = await Project.find({
    owner: adminId,
  }).select("_id name createdAt");

  const projectIds = projects.map((project) => project._id);

  const totalProjects = projects.length;

  const totalTasks = await Task.countDocuments({
    project: { $in: projectIds },
  });

  const statusStats = await Task.aggregate([
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
  ]);

  const statusMap = statusStats.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  const todoTasks = statusMap.todo || 0;
  const inProgressTasks = statusMap["in-progress"] || 0;
  const doneTasks = statusMap.done || 0;

  const completionRate =
    totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const priorityStats = await Task.aggregate([
    {
      $match: {
        project: { $in: projectIds },
      },
    },
    {
      $group: {
        _id: "$priority",
        count: { $sum: 1 },
      },
    },
  ]);

  const priorityMap = priorityStats.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  const lowPriority = priorityMap.low || 0;
  const mediumPriority = priorityMap.medium || 0;
  const highPriority = priorityMap.high || 0;

  const tasksByProject = await Task.aggregate([
    {
      $match: {
        project: { $in: projectIds },
      },
    },
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
      $sort: {
        tasks: -1,
      },
    },
    {
      $limit: 3,
    },
  ]);

  const projectMap = new Map(
    projects.map((project) => [project._id.toString(), project.name]),
  );

  const projectAnalytics = tasksByProject.map((item) => ({
    project: projectMap.get(item._id.toString()) || "Unknown",
    tasks: item.tasks,
    completionRate:
      item.tasks > 0 ? Math.round((item.completedTasks / item.tasks) * 100) : 0,
  }));

  const projectProgress = await Task.aggregate([
    {
      $match: {
        project: { $in: projectIds },
      },
    },
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
  ]);

  const progressData = projectProgress.map((item) => ({
    project: projectMap.get(item._id.toString()) || "Unknown",
    tasks: item.tasks,
    completionRate:
      item.tasks > 0 ? Math.round((item.completedTasks / item.tasks) * 100) : 0,
  }));

  const contributors = await Task.aggregate([
    {
      $match: {
        project: { $in: projectIds },
        assignedTo: { $ne: null },
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
      $limit: 5,
    },
  ]);

  const contributorIds = contributors.map((item) => item._id);

  const users = await User.find({
    _id: { $in: contributorIds },
  }).select("fullname email");

  const userMap = new Map(users.map((user) => [user._id.toString(), user]));

  const topContributors = contributors.map((item) => {
    const user = userMap.get(item._id.toString());

    return {
      fullname: user?.fullname || "Unknown",
      email: user?.email || "",
      assignedTasks: item.assignedTasks,
      completedTasks: item.completedTasks,
    };
  });

  const overdueTasks = await Task.find({
    project: { $in: projectIds },
    dueDate: {
      $lt: new Date(),
    },
    status: {
      $ne: "done",
    },
  })
    .populate("project", "name")
    .populate("assignedTo", "fullname email")
    .select("title dueDate project assignedTo")
    .sort({ dueDate: 1 })
    .limit(10);

  const overdueTaskData = overdueTasks.map((task) => ({
    _id: task._id,
    title: task.title,
    project: task.project?.name || "Unknown",
    assignedTo: task.assignedTo?.fullname || "Unassigned",
    dueDate: task.dueDate,
  }));

  const monthlyTasks = await Task.aggregate([
    {
      $match: {
        project: { $in: projectIds },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
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

  const monthlyTaskData = monthlyTasks.map((item) => ({
    month: monthNames[item._id.month - 1],
    year: item._id.year,
    tasks: item.tasks,
  }));

  const analyticsData = {
    totalMembers,
    overview: {
      totalProjects,
      totalTasks,
      todoTasks,
      inProgressTasks,
      doneTasks,
      completionRate,
    },

    priority: {
      lowPriority,
      mediumPriority,
      highPriority,
    },

    projectAnalytics,

    projectProgress: progressData,

    topContributors,

    overdueTasks: overdueTaskData,

    monthlyTasks: monthlyTaskData,
  };

  cacheHelper.setCache(cacheKey, analyticsData);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Admin analytics fetched successfully",
        analyticsData,
      ),
    );
});

export { getAdminAnalytics };
