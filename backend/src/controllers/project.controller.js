import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import cache from "../utils/cache.js";
import cacheHelper from "../utils/cache.helper.js";
import Task from "../models/task.model.js";
import Activity from "../models/activity.model.js";
import mongoose from "mongoose";

const createProject = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      throw new ApiError(400, "All fields required!");
    }

    const project = await Project.create(
      [
        {
          name,
          description,
          owner: req.user._id,
          members: [
            {
              user: req.user._id,
              role: req.user.role,
            },
          ],
        },
      ],
      { session },
    );

    const createdProject = project[0];

    await Activity.create(
      [
        {
          project: createdProject._id,
          user: req.user._id,
          action: `Created Project ${createdProject.name}`,
        },
      ],
      { session },
    );

    cacheHelper.deleteByPrefix(`projects_${req.user._id}`);
    cacheHelper.deleteCache(`dashboard_${req.user._id}`);

    await session.commitTransaction();

    return res
      .status(201)
      .json(
        new ApiResponse(201, "Project created successfully!", createdProject),
      );
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
});

const getProject = asyncHandler(async (req, res) => {
  const cacheKey = `project_${req.user._id}_${req.params.projectId}`;
  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Project fetched from cache!", cached.data));
  } else {
    cacheHelper.deleteCache(cacheKey);
  }

  const project = await Project.findById(req.params?.projectId)
    .populate("owner", "fullname role")
    .populate("members.user", "fullname email role");

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const isMember =
    project.owner._id.equals(req.user._id) ||
    project.members.some((member) => member.user._id.equals(req.user._id));

  if (!isMember) {
    throw new ApiError(403, "Access denied");
  }

  cacheHelper.setCache(cacheKey, project);
  return res
    .status(200)
    .json(new ApiResponse(200, "Project Find Successfully", project));
});

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    throw new ApiError(404, "No Project found!");
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Access denied!");
  }

  await project.deleteOne();

  cacheHelper.deleteByPrefix(`projects_${req.user._id}`);
  cacheHelper.deleteCache(`dashboard_${req.user._id}`);
  cacheHelper.deleteByPrefix(`project_${req.user._id}`);
  cacheHelper.deleteByPrefix(`members_${req.user._id}`);

  res.status(200).json(new ApiResponse(200, "Project deleted successfully!"));
});

const updateProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  if (project.name === name && project.description === description) {
    throw new ApiError(400, "No change found!");
  }

  const isOwner = project.owner.toString() === req.user._id.toString();
  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "You can't update the project!");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $set: { name, description } },
    { new: true, runValidators: true },
  );

  cacheHelper.deleteCache(`project_${req.user._id}_${projectId}`);
  cacheHelper.deleteByPrefix(`projects_${req.user._id}`);
  cacheHelper.deleteCache(`dashboard_${req.user._id}`);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Project Updated successfully!", updatedProject),
    );
});

const getProjects = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const cacheKey = `projects_${req.user._id}_${search?.toLowerCase()}`;

  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Projects fetched from cache!", cached.data));
  } else {
    cacheHelper.deleteCache(cacheKey);
  }

  const projects = await Project.find({
    $or: [{ owner: req.user._id }, { "members.user": req.user._id }],
    name: {
      $regex: search || "",
      $options: "i",
    },
  }).populate("owner", "fullname email");

  cacheHelper.setCache(cacheKey, projects);

  return res
    .status(200)
    .json(new ApiResponse(200, "Projects Find Successfully!", projects));
});

const addMember = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { email } = req.body;
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  const member = await User.findOne({ email: email.toLowerCase() });

  if (!member) {
    throw new ApiError(404, "User not found!");
  }

  if (!project.owner.equals(req.user._id)) {
    throw new ApiError(403, "Only owner can add members!");
  }

  const memberExists = project.members.some((m) => {
    return m.user.equals(member._id);
  });

  if (memberExists) {
    throw new ApiError(400, "User already a member!");
  }

  project.members.push({ user: member._id, role: member.role || "member" });
  await project.save();

  cacheHelper.deleteCache(`project_${req.user._id}_${projectId}`);
  cacheHelper.deleteCache(`members_${req.user._id}_${projectId}`);
  cacheHelper.deleteCache(`dashboard_${member._id}`);
  cacheHelper.deleteCache(`project_${member._id}_${projectId}`);
  cacheHelper.deleteCache(`members_${member._id}_${projectId}`);
  cacheHelper.deleteByPrefix(`project_tasks_${projectId}`);

  res.status(200).json(new ApiResponse(200, "Member added successfully!"));
});

const removeMember = asyncHandler(async (req, res) => {
  const { memberId, projectId } = req.params;

  const member = await User.findById(memberId);

  if (!member) {
    throw new ApiError(404, "Member not found!");
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  if (
    req.user.role !== "admin" &&
    project.owner.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(403, "You don't have permission to remove member");
  }

  const isMember = project.members.some((m) => m.user.toString() === memberId);

  if (!isMember) {
    throw new ApiError(404, "Member not found in this project!");
  }

  if (project.owner.toString() === member._id.toString()) {
    throw new ApiError(403, "You cann't remove project Owner!");
  }

  project.members = project.members.filter(
    (m) => m.user.toString() !== memberId,
  );

  await project.save();
  await Task.updateMany(
    {
      project: project._id,
      assignedTo: memberId,
    },
    {
      $unset: {
        assignedTo: "",
      },
    },
  );

  await Activity.create({
    project: project._id,
    user: req.user._id,
    action: `${member.fullname} has been removed from the project`,
  });

  cacheHelper.deleteCache(`project_${req.user._id}_${projectId}`);
  cacheHelper.deleteCache(`members_${req.user._id}_${projectId}`);

  cacheHelper.deleteCache(`project_${memberId}_${projectId}`);
  cacheHelper.deleteCache(`members_${memberId}_${projectId}`);

  cacheHelper.deleteByPrefix(`task_${req.user._id}_`);
  cacheHelper.deleteByPrefix(`tasks_${memberId}`);
  cacheHelper.deleteCache(`dashboard_${memberId}`);

  cacheHelper.deleteByPrefix(`project_tasks_${projectId}`);

  res.status(200).json(new ApiResponse(200, "Member removed successfully!"));
});

const getProjectMembers = asyncHandler(async (req, res) => {
  const cacheKey = `members_${req.user._id}_${req.params.projectId}`;
  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Project members fetched from cache", cached.data),
      );
  } else {
    cacheHelper.deleteCache(cacheKey);
  }

  //.populate({})  in obj,  it's a nested schema to get all details of a user based on (members.user => id)
  const project = await Project.findById(req.params.projectId).populate({
    path: "members.user",
    select: "fullname email role",
  });

  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  cacheHelper.setCache(cacheKey, project.members);

  res
    .status(200)
    .json(new ApiResponse(200, "All members fetched!", project.members));
});

export default {
  createProject,
  getProject,
  deleteProject,
  updateProject,
  getProjects,
  addMember,
  removeMember,
  getProjectMembers,
};
