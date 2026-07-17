import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import cache from "../utils/cache.js";
import cacheHelper from "../utils/cache.helper.js";
import Activity from "../models/activity.model.js";
import mongoose from "mongoose";

const createProject = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, description } = req.body;

    if (req.user.role !== "admin") {
      throw new ApiError(403, "Only admin can create project");
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

    cacheHelper.deleteCache(`projects_${req.user._id}`);
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

const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);

  if (!project) {
    throw new ApiError(404, "No Project found!");
  }

  if (project.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Access denied!");
  }

  await project.deleteOne();
  cacheHelper.deleteCache(`dashboard_${req.user._id}`);

  res.status(200).json(new ApiResponse(200, "Project deleted successfully!"));
});

const getProjects = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const cacheKey = `projects_${req.user._id}`;

  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);
    return res
      .status(200)
      .json(new ApiResponse(200, "Projects fetched from cache!", cached.data));
  } else {
    console.log("Cache Miss:", cacheKey);
    cacheHelper.deleteCache(cacheKey);
  }

  const projects = await Project.find({
    owner: req.user._id,
    name: {
      $regex: search || "",
      $options: "i",
    },
  }).populate("owner", "fullname email");

  //set data in cache after fetching data from the database
  cacheHelper.setCache(cacheKey, projects);

  return res
    .status(200)
    .json(new ApiResponse(200, "Project Find Successfully!", projects));
});

const addMember = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const project = await Project.findById(req.params.projectId);
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

  return res
    .status(200)
    .json(new ApiResponse(200, "Member is added successfully!", project));
});

const getProjectMembers = asyncHandler(async (req, res) => {
  //.populate({})  in obj,  it's a nested schema to get all details of a user based on (members.user => id)
  const project = await Project.findById(req.params.projectId).populate({
    path: "members.user",
    select: "fullname email role",
  });

  if (!project) {
    throw new ApiError(404, "Project not found!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "All members fetched!", project.members));
});

export default {
  createProject,
  deleteProject,
  getProjects,
  addMember,
  getProjectMembers,
};
