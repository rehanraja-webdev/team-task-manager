import Activity from "../models/activity.model.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import cacheHelper from "../utils/cache.helper.js";

const getTaskActivities = asyncHandler(async (req, res) => {
  const { taskId } = req.params;

  const task = await Task.findById(taskId).select("project");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const project = await Project.findById(task.project).select("owner members");

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (req.user.role === "admin") {
    if (project.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(
        403,
        "You do not have access to this project's activities",
      );
    }
  }

  if (req.user.role === "member") {
    const isMember = project.members.some(
      (member) => member.user.toString() === req.user._id.toString(),
    );

    if (!isMember) {
      throw new ApiError(
        403,
        "You do not have access to this project's activities",
      );
    }
  }

  const activities = await Activity.find({
    task: taskId,
    project: project._id,
  })
    .populate("user", "fullname email")
    .sort({ createdAt: -1 });

  res
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

  const cacheKey = `activities_${userId}_${page}_${limit}`;

  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);

    return res
      .status(200)
      .json(new ApiResponse(200, "Activities fetched from cache", cached.data));
  }

  console.log("Cache Miss:", cacheKey);
  cacheHelper.deleteCache(cacheKey);

  let projectFilter;

  if (req.user.role === "admin") {
    projectFilter = {
      createdBy: userId,
    };
  } else {
    projectFilter = {
      "members.user": userId,
    };
  }

  const projects = await Project.find(projectFilter).select("_id");

  const projectIds = projects.map((project) => project._id);

  const activityFilter = {
    project: { $in: projectIds },
  };

  const [activities, total] = await Promise.all([
    Activity.find(activityFilter)
      .populate("user", "fullname email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Activity.countDocuments(activityFilter),
  ]);

  const data = {
    activities,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    hasMore: skip + activities.length < total,
  };

  cacheHelper.setCache(cacheKey, data);

  res
    .status(200)
    .json(new ApiResponse(200, "Activities fetched successfully!", data));
});

export default {
  getTaskActivities,
  getAllActivities,
};
