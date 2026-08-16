import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import cache from "../utils/cache.js";
import cacheHelper from "../utils/cache.helper.js";
import cacheInvalidation from "../utils/cacheInvalidation.js";
import Task from "../models/task.model.js";
import Activity from "../models/activity.model.js";
import mongoose from "mongoose";
import createNotification from "../utils/createNotification.js";
import cacheKeys from "../utils/cacheKeys.js";

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

    await cacheInvalidation.projectCreated(req.user._id);

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
  const { projectId } = req.params;

  const key = cacheKeys.project(projectId);
  const cached = cacheHelper.getCache(key);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Project fetched from cache!", cached.data));
  } else {
    cacheHelper.deleteCache(key);
  }

  const project = await Project.findById(projectId)
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

  cacheHelper.setCache(key, project);
  return res
    .status(200)
    .json(new ApiResponse(200, "Project Find Successfully", project));
});

const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "No Project found!");
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Access denied!");
  }

  const memberIds = project.members
    .map((member) => member.user)
    .filter((userId) => !userId.equals(req.user._id));

  await Promise.all(
    memberIds.map((userId) =>
      createNotification({
        user: userId,
        title: "Project deleted",
        message: `${project.name} has been deleted!`,
        type: "project",
      }),
    ),
  );

  await project.deleteOne();

  await cacheInvalidation.projectDeleted(projectId, req.user._id);

  res.status(200).json(new ApiResponse(200, "Project deleted successfully!"));
});

const updateProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  const isOwner = project.owner.toString() === req.user._id.toString();

  const isAdmin = req.user.role === "admin";

  if (!isOwner && !isAdmin) {
    throw new ApiError(403, "You can't update the project!");
  }

  const changes = {};

  if (name !== undefined && name !== project.name) {
    changes.name = name;
  }

  if (description !== undefined && description !== project.description) {
    changes.description = description;
  }

  if (Object.keys(changes).length === 0) {
    throw new ApiError(400, "No change found!");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    projectId,
    { $set: changes },
    {
      new: true,
      runValidators: true,
    },
  );

  const memberIds = project.members
    .map((member) => member.user)
    .filter((userId) => !userId.equals(req.user._id));

  if (memberIds.length > 0) {
    await Promise.all(
      memberIds.map((userId) =>
        createNotification({
          user: userId,
          title: "Project updated",
          message: `"${project.name}" has been updated.`,
          type: "project",
        }),
      ),
    );
  }

  await cacheInvalidation.projectUpdated(projectId, req.user._id);

  res
    .status(200)
    .json(
      new ApiResponse(200, "Project updated successfully!", updatedProject),
    );
});

const getProjects = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const mode = req.query.mode;

  const query = {
    $or: [{ owner: userId }, { "members.user": userId }],
  };

  if (mode === "options") {
    const key = cacheKeys.projects(userId);

    const cached = cacheHelper.getCache(key);

    if (cached && cached.expiresAt > Date.now()) {
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            "Project options fetched from cache",
            cached.data,
          ),
        );
    }

    if (cached) {
      cacheHelper.deleteCache(key);
    }

    const projects = await Project.find(query)
      .select("_id name")
      .sort({ name: 1 })
      .lean();

    cacheHelper.setCache(key, projects);

    return res
      .status(200)
      .json(
        new ApiResponse(200, "Project options fetched successfully", projects),
      );
  }

  const pageNum = Math.max(1, parseInt(req.query.page, 10) || 1);

  const limitNum = Math.min(
    50,
    Math.max(1, parseInt(req.query.limit, 10) || 10),
  );

  const skip = (pageNum - 1) * limitNum;

  const key = `projects_${userId}_p${pageNum}_l${limitNum}`;

  const cached = cacheHelper.getCache(key);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Projects fetched from cache", cached.data));
  }

  if (cached) {
    cacheHelper.deleteCache(cacheKey);
  }

  const [projects, totalProjects] = await Promise.all([
    Project.find(query)
      .select("name description owner members createdAt updatedAt")
      .populate("owner", "fullname role")
      .populate("members.user", "fullname email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean(),

    Project.countDocuments(query),
  ]);

  const totalPages = Math.ceil(totalProjects / limitNum);

  const responseData = {
    projects,
    pagination: {
      currentPage: pageNum,
      totalPages,
      totalProjects,
      limit: limitNum,
      hasNextPage: pageNum < totalPages,
      hasPreviousPage: pageNum > 1,
    },
  };

  cacheHelper.setCache(key, responseData);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Projects retrieved successfully", responseData),
    );
});

const addMember = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { email } = req.body;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  const member = await User.findOne({
    email: email.toLowerCase(),
  });

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

  project.members.push({
    user: member._id,
    role: member.role || "member",
  });

  await project.save();

  await createNotification({
    user: member._id,
    title: "Added to project",
    message: `You have been added to "${project.name}".`,
    type: "project",
  });

  await cacheInvalidation.memberAdded(projectId, [req.user._id, member._id]);

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
    throw new ApiError(403, "You can't remove project Owner!");
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

  await createNotification({
    user: member._id,
    title: "Removed from project",
    message: `You have been removed from "${project.name}".`,
    type: "project",
  });

  await cacheInvalidation.memberRemoved(projectId, [req.user._id, memberId]);

  res.status(200).json(new ApiResponse(200, "Member removed successfully!"));
});

const getProjectMembers = asyncHandler(async (req, res) => {
  const cacheKey = cacheKeys.members(req.user._id, req.params.projectId);
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
