import Activity from "../models/activity.model.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import cacheHelper from "../utils/cache.helper.js";
import cacheKeys from "../utils/cacheKeys.js";

const getTaskActivities = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user._id;

  const key = cacheKeys.taskActivities(userId, taskId);
  const cached = cacheHelper.getCache(key);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Task Activities fetched from cache", cached.data),
      );
  }

  if (cached) {
    cacheHelper.deleteCache(key);
  }

  const task = await Task.findById(taskId)
    .select("project")
    .populate({
      path: "project",
      select: "owner members.user",
    })
    .lean();

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const project = task.project;

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const userIdString = userId.toString();

  if (req.user.role === "admin") {
    if (project.owner.toString() !== userIdString) {
      throw new ApiError(
        403,
        "You do not have access to this project's activities",
      );
    }
  } else if (req.user.role === "member") {
    const isMember = project.members.some(
      (member) => member.user.toString() === userIdString,
    );

    if (!isMember) {
      throw new ApiError(
        403,
        "You do not have access to this project's activities",
      );
    }
  }

  const activities = await Activity.find({ task: taskId })
    .select("user action createdAt")
    .populate("user", "fullname email")
    .sort({ createdAt: -1 })
    .lean();

  cacheHelper.setCache(key, activities);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Task activities fetched successfully!", activities),
    );
});

const getAllActivities = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Math.min(Number(req.query.limit) || 20, 100);

  const skip = (page - 1) * limit;
  const userId = req.user._id;

  const key = cacheKeys.activities(userId, page, limit);
  const cached = cacheHelper.getCache(key);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Task activity fetched from cache", cached.data),
      );
  }

  if (cached) {
    cacheHelper.deleteCache(key);
  }

  let projectFilter;

  if (req.user.role === "admin") {
    projectFilter = {
      owner: userId,
    };
  } else {
    projectFilter = {
      "members.user": userId,
    };
  }

  const projects = await Project.find(projectFilter).select("_id");

  const projectIds = projects.map((project) => project._id);

  const activityFilter = {
    project: {
      $in: projectIds,
    },
  };

  const [activities, total] = await Promise.all([
    Activity.find(activityFilter)
      .populate("user", "fullname email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Activity.countDocuments(activityFilter),
  ]);

  const data = {
    activities,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    hasMore: skip + activities.length < total,
  };

  cacheHelper.setCache(key, data);

  return res
    .status(200)
    .json(new ApiResponse(200, "Activities fetched successfully!", data));
});

export default {
  getTaskActivities,
  getAllActivities,
};
