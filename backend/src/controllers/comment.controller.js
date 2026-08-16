import asyncHandler from "../utils/asyncHandler.js";
import Task from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";
import Comment from "../models/comment.model.js";
import Activity from "../models/activity.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import createNotification from "../utils/createNotification.js";

import cacheHelper from "../utils/cache.helper.js";
import cacheKeys from "../utils/cacheKeys.js";
import cacheInvalidation from "../utils/cacheInvalidation.js";

const addComment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { content } = req.body;
  const { projectId, taskId } = req.params;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "No task found!");
  }

  const comment = await Comment.create({
    task: task._id,
    user: userId,
    content,
  });

  await Activity.create({
    task: task._id,
    user: userId,
    action: "Added Comment",
  });

  await createNotification({
    user: task.createdBy,
    type: "comment",
    title: "New Comment Added!",
    message: `${req.user.fullname} commented on ${task.title}`,
    task: task._id,
    project: projectId,
  });

  await Promise.all([
    cacheInvalidation.comment(userId, taskId),
    cacheInvalidation.activity(userId),
  ]);

  return res
    .status(201)
    .json(new ApiResponse(201, "Comment and activity created!", comment));
});

const getTaskComments = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { taskId } = req.params;

  const key = cacheKeys.comments(userId, taskId);

  const cached = cacheHelper.getCache(key);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Task comments fetched from cache", cached.data),
      );
  }

  if (cached) {
    cacheHelper.deleteCache(key);
  }

  const comments = await Comment.find({
    task: taskId,
  })
    .populate("user", "fullname email")
    .sort({ createdAt: -1 });

  cacheHelper.setCache(key, comments);

  return res
    .status(200)
    .json(new ApiResponse(200, "All comments fetched!", comments));
});

export default {
  addComment,
  getTaskComments,
};
