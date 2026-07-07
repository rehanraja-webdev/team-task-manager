import Project from "../models/project.model.js";

const createProject = async (req, res) => {
  res.json({ message: "project created!" });
};

const getProjects = async (req, res) => {
  res.json({ message: "projects fetch!" });
};

export default { createProject, getProjects };
