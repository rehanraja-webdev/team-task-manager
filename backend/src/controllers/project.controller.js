import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const project = await Project.create({
    name,
    description,
    owner: req.user._id,
    members: [{ user: req.user._id, role: req.user.role }],
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "project created successfully!", project));
});

const getProjects = asyncHandler(async (req, res) => {
  const { search } = req.query;

  const projects = await Project.find({
    owner: req.user._id,
    name: {
      $regex: search,
      $options: "i",
    },
  }).populate("owner", "fullname email");

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

  const member = await User.findOne({ email });

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

  res
    .status(200)
    .json(new ApiResponse(200, "All members fetched!", project.members));
});

export default { createProject, getProjects, addMember, getProjectMembers };
