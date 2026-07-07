import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/project.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const project = await Project.create({
    name,
    description,
    owner: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "project created successfully!", project));
});

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ owner: req.user._id }).populate(
    "owner",
    "fullname email",
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Project Find Successfully!", project));
});

export default { createProject, getProjects };
