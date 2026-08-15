import asyncHandler from "../utils/asyncHandler.js";
import Task from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";
import Comment from "../models/comment.model.js";
import Activity from "../models/activity.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import createNotification from "../utils/createNotification.js";
import cacheHelper from "../utils/cache.helper.js";

const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { projectId, taskId } = req.params;
  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "No task found!");
  }

  const comment = await Comment.create({
    task: task._id,
    user: req.user._id,
    content,
  });

  const activity = await Activity.create({
    task: task._id,
    user: req.user._id,
    action: "Added Comment",
  });

  await createNotification({
    user: task.createdBy,
    type: "comment",
    title: "New Comment Added!",
    message: `${(req, user.fullname)} commented on ${task.title}`,
    task: task._id,
    project: projectId,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Comment and activity created!", comment));
});

const getTaskComments = asyncHandler(async (req, res) => {
  const cacheKey = `comments_${req.user._id}`;
  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Task comments fetched from cache", cached.data),
      );
  } else {
    cacheHelper.deleteCache(cacheKey);
  }

  const comments = await Comment.find({ task: req.params.taskId }).populate(
    "user",
    "fullname email",
  );

  cacheHelper.setCache(cacheKey, comments);

  res.status(200).json(new ApiResponse(200, "All comments fetched!", comments));
});

export default { addComment, getTaskComments };
