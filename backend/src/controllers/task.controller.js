import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Task from "../models/task.model.js";
import Activity from "../models/activity.model.js";
import mongoose from "mongoose";
import validateObjectId from "../utils/validateObjectId.js";
import cache from "../utils/cache.js";
import { getIO } from "../socket/socket.js";
import cacheHelper from "../utils/cache.helper.js";
import createNotification from "../utils/createNotification.js";

const createTask = asyncHandler(async (req, res) => {
  const { title, description, projectId, assignedTo, priority, dueDate } =
    req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  const isMember = project.members.some((member) => {
    return member.user.equals(req.user._id);
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
    priority,
    dueDate,
    createdBy: req.user._id,
  });

  await Activity.create({
    task: task._id,
    user: req.user._id,
    action: "Task Created",
  });

  await createNotification({
    user: assignedTo,
    type: "task",
    title: "New Task Assigned",
    message: `You have been assigned the task "${task.title}"`,
    task: task._id,
    project: projectId,
  });

  cacheHelper.deleteCache(`dashboard_${req.user._id}`);
  cacheHelper.deleteCache(`dashboard_${assignedTo}`);

  cacheHelper.deleteByPrefix(`tasks_${req.user._id}`);
  cacheHelper.deleteByPrefix(`tasks_${assignedTo}`);

  cacheHelper.deleteByPrefix(`project_tasks_${projectId}`);
  cacheHelper.deleteByPrefix(`project_${req.user._id}`);

  res
    .status(201)
    .json(new ApiResponse(201, "Task created successfully!", task));
});

const getTasks = asyncHandler(async (req, res) => {
  const { view } = req.query;
  const cacheKey = `tasks_${req.user._id}_${view || "default"}`;
  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(new ApiResponse(200, "All tasks fetched from cache", cached.data));
  } else {
    cacheHelper.deleteCache(cacheKey);
  }

  let filter = {};

  if (view === "assigned") {
    filter = { assignedTo: req.user._id };
  } else if (view === "created") {
    filter = { createdBy: req.user._id };
  } else if (view === "all") {
    if (req.user.role !== "admin") {
      throw new ApiError(403, "Only admins can view all tasks.");
    }

    filter = {};
  } else {
    // Default behavior
    filter = req.user.role === "admin" ? {} : { assignedTo: req.user._id };
  }

  const tasks = await Task.find(filter)
    .populate("createdBy", "fullname email")
    .populate("assignedTo", "fullname email")
    .populate("project", "name");

  cacheHelper.setCache(cacheKey, tasks);
  return res
    .status(200)
    .json(new ApiResponse(200, "Tasks fetched successfully.", tasks));
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (!task) {
    throw new ApiError(400, "Invalid task ID!");
  }

  if (!task.createdBy.equals(req.user._id) && req.user.role !== "admin") {
    throw new ApiError(403, "You are not allowed to delete the task!");
  }

  await task.deleteOne();

  createNotification({
    user: assignedTo,
    type: "task",
    title: "Task deleted",
    message: `Task has been deleted "${task.title}"`,
    task: task._id,
    project: projectId,
  });

  cacheHelper.deleteCache(`dashboard_${req.user._id}`);
  cacheHelper.deleteCache(`project_${req.user._id}_${req.params.projectId}`);
  cacheHelper.deleteByPrefix(`tasks_${req.user._id}`);
  cacheHelper.deleteCache(`task_${req.user._id}_${task._id}`);
  cacheHelper.deleteByPrefix(`project_tasks_${task.project}`);

  return res
    .status(200)
    .json(new ApiResponse(200, "Task deleted successfully"));
});

const getProjectTasks = asyncHandler(async (req, res) => {
  const cacheKey = `project_tasks_${req.params.projectId}_${JSON.stringify(req.query)}`;
  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Project tasks fetched from cache", cached.data),
      );
  } else {
    cacheHelper.deleteCache(cacheKey);
  }

  //It will get the variable from the url search query (eg: ..?status = done)
  const {
    status,
    priority,
    search,
    assignedTo,
    page = 1,
    limit = 5,
  } = req.query;

  const filter = { project: req.params.projectId };

  if (req.user.role === "member") {
    filter.assignedTo = req.user._id;
  }

  //add query in filter one by one if found
  if (status) {
    filter.status = status;
  }

  if (priority) {
    filter.priority = priority;
  }

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (assignedTo && req.user.role !== "member") {
    filter.assignedTo = assignedTo;
  }

  const skip = (Number(page) - 1) * Number(limit);

  let sortOption = { createdAt: -1 };

  if (req.query.sort === "oldest") {
    sortOption = { createdAt: 1 };
  }

  if (req.query.sort === "priority") {
    sortOption = { priority: 1 };
  }

  //if no query if found, then it will find task by (project: req.params.projectId). Otherwise it will push the query in the filter object.

  const tasks = await Task.find(filter)
    .populate("assignedTo", "fullname email")
    .populate("project", "name")
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  if (tasks.length === 0) {
    return res.json({ message: "No tasks available", totalTasks: 0 });
  }

  const totalTasks = await Task.countDocuments(filter);

  cacheHelper.setCache(cacheKey, {
    tasks,
    totalTasks,
    currentPage: Number(page),
    totalPages: Math.ceil(totalTasks / limit),
  });

  res.status(200).json(
    new ApiResponse(200, "All Task Fetched!", {
      tasks,
      totalTasks,
      currentPage: Number(page),
      totalPages: Math.ceil(totalTasks / limit),
    }),
  );
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  if (!validateObjectId(req.params.taskId)) {
    throw new ApiError(400, "Invalid task ID!");
  }

  const { status } = req.body;
  const task = await Task.findById(req.params.taskId);

  if (!task) {
    throw new ApiError(404, "No task found!");
  }

  if (task.assignedTo.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can't update the task status!");
  }

  task.status = status;
  await task.save();

  getIO().to(task.project.toString()).emit("taskUpdated", {
    taskId: task._id,
    status: task.status,
  });

  await Activity.create({
    task: task._id,
    user: req.user._id,
    action: `Changed status to ${status}`,
  });

  await createNotification({
    user: task.createdBy,
    type: "task",
    title: "Task status updated!",
    message: `Task status updated to "${task.status}"`,
    task: task._id,
    project: projectId,
  });

  cacheHelper.deleteCache(`dashboard_${req.user._id}`);
  cacheHelper.deleteByPrefix(`project_${req.user._id}`);
  cacheHelper.deleteByPrefix(`projects_${req.user._id}`);
  cacheHelper.deleteCache(`task_${req.user._id}_${task._id}`);
  cacheHelper.deleteByPrefix(`tasks_${req.user._id}`);
  cacheHelper.deleteByPrefix(`project_tasks_${task.project}`);

  res.status(200).json(new ApiResponse(200, "Task updated successfully", task));
});

const updateTaskDetails = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { title, description, priority, assignedTo, dueDate } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new ApiError(404, "No task found!");
  }

  if (
    task.createdBy.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "You can't update task details!");
  }

  const isTitleUnchanged =
    title !== undefined && (task.title || "").trim() === title.trim();

  const isDescriptionUnchanged =
    description !== undefined &&
    (task.description || "").trim() === description.trim();

  const isPriorityUnchanged =
    priority !== undefined && task.priority === priority;

  const isAssignedToUnchanged =
    assignedTo !== undefined &&
    task.assignedTo?.toString() === assignedTo?.toString();

  const taskTime = task.dueDate ? new Date(task.dueDate).getTime() : null;
  const newTime = dueDate ? new Date(dueDate).getTime() : null;
  const isDueDateUnchanged = dueDate !== undefined && taskTime === newTime;

  if (
    isTitleUnchanged &&
    isDescriptionUnchanged &&
    isPriorityUnchanged &&
    isAssignedToUnchanged &&
    isDueDateUnchanged
  ) {
    throw new ApiError(400, "No changes detected to update!");
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (priority !== undefined) task.priority = priority;
  if (assignedTo !== undefined) task.assignedTo = assignedTo;
  if (dueDate !== undefined) task.dueDate = dueDate;

  const updatedTask = await task.save();

  await Activity.create({
    task: task._id,
    user: req.user._id,
    action: "Task details updated!",
  });

  if (!task.assignedTo.equals(req.user._id)) {
    await createNotification({
      user: task.assignedTo,
      type: "task",
      title: "Task details updated",
      message: `${req.user.fullname} updates "${task}"`,
      task: task._id,
      project: task.project,
    });
  }

  cacheHelper.deleteCache(`dashboard_${req.user._id}`);
  cacheHelper.deleteByPrefix(`project_${req.user._id}`);
  cacheHelper.deleteByPrefix(`projects_${req.user._id}`);
  cacheHelper.deleteCache(`task_${req.user._id}_${task._id}`);
  cacheHelper.deleteByPrefix(`tasks_${req.user._id}`);
  cacheHelper.deleteByPrefix(`project_tasks_${task.project}`);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Task details updated successfully", updatedTask),
    );
});

const getTask = asyncHandler(async (req, res) => {
  const cacheKey = `task_${req.user._id}_${req.params.taskId}`;
  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Task fetched from cache", cached.data));
  } else {
    cacheHelper.deleteCache(cacheKey);
  }

  const task = await Task.findById(req.params.taskId)
    .populate("assignedTo", "fullname email")
    .populate("project", "name")
    .populate("createdBy", "fullname email");

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  const project = await Project.findById(task.project);

  const isMember =
    project.owner.equals(req.user._id) ||
    project.members.some((m) => m.user.equals(req.user._id));

  if (!isMember) throw new ApiError(403, "Access denied");

  cacheHelper.setCache(cacheKey, task);

  return res
    .status(200)
    .json(new ApiResponse(200, "Task fetched successfully", task));
});

export default {
  createTask,
  getTasks,
  getProjectTasks,
  getTask,
  deleteTask,
  updateTaskStatus,
  updateTaskDetails,
};
