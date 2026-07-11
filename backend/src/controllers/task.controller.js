import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Task from "../models/task.model.js";
import Activity from "../models/activity.model.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, projectId, assignedTo } = req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  const user = req.user;
  const isMember = project.members.some((member) => {
    return member.user.equals(user._id);
  });

  if (!isMember) {
    throw new ApiError(403, "You are not Project member!");
  }

  const assignedMember = project.members.some((member) => {
    return member.user.equals(assignedTo);
  });

  if (!assignedMember) {
    throw new ApiError(400, "Assigned user must be a project member!");
  }

  const task = await Task.create({
    title,
    description,
    project: projectId,
    assignedTo,
  });

  await Activity.create({
    task: task._id,
    user: req.user._id,
    action: "Task Created",
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Task created successfully!", task));
});

const getProjectTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId })
    .populate("assignedTo", "fullname email")
    .populate("project", "name");

  if (tasks.length === 0) {
    throw new ApiError(404, "No task found!");
  }

  res.status(200).json(new ApiResponse(200, "All Task Fetched!", tasks));
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const task = await Task.findById(req.params.taskId);

  if (!task) {
    throw new ApiError(404, "No task found!");
  }

  if (task.assignedTo.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Only assigned member can update task status");
  }

  task.status = status;
  await task.save();

  await Activity.create({
    task: task._id,
    user: req.user._id,
    action: `Changed status to ${status}`,
  });

  res.status(200).json(new ApiResponse(200, "Task updated successfully", task));
});

export default { createTask, getProjectTasks, updateTaskStatus };
