import asyncHandler from "../utils/asyncHandler.js";
import Task from "../models/task.model.js";
import ApiError from "../utils/ApiError.js";
import Comment from "../models/comment.model.js";
import Activity from "../models/activity.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const addComment = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const task = await Task.findById(req.params.taskId);

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

  res
    .status(201)
    .json(new ApiResponse(201, "Comment and activity created!", comment));
});

const getTaskComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ task: req.params.taskId }).populate(
    "user",
    "fullname email",
  );

  if (comments.length === 0) {
    throw new ApiError(404, "No comments found!");
  }

  res.status(200).json(new ApiResponse(200, "All comments fetched!", comments));
});

export default { addComment, getTaskComments };
