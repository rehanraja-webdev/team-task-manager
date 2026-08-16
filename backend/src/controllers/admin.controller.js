import Project from "../models/project.model.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import cacheHelper from "../utils/cache.helper.js";
import cacheKeys from "../utils/cacheKeys.js";
import jobQueue from "../utils/jobQueue.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;

  const key = cacheKeys.projectUsers(ownerId);
  const cached = cacheHelper.getCache(key);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Project users fetched from cache", cached.data),
      );
  }

  if (cached) {
    cacheHelper.deleteCache(key);
  }

  const projects = await Project.find({
    owner: ownerId,
  }).select("members.user");

  const userIds = new Set([ownerId.toString()]);

  projects.forEach((project) => {
    project.members.forEach((member) => {
      userIds.add(member.user.toString());
    });
  });

  const users = await User.find({
    _id: { $in: [...userIds] },
  }).select("-password");

  cacheHelper.setCache(key, users);

  return res
    .status(200)
    .json(new ApiResponse(200, "Project users fetched successfully!", users));
});

const getQueueStats = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(
      new ApiResponse(200, "Queue Stats", { pending: jobQueue.getQueueSize }),
    );
});
export default { getAllUsers, getQueueStats };
