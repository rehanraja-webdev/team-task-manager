import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

import User from "../models/user.model.js";
import Task from "../models/task.model.js";
import Project from "../models/project.model.js";

export const globalSearch = asyncHandler(async (req, res) => {
  const q = req.query.q?.trim();

  if (!q) {
    return res.json(
      new ApiResponse(200, "Search Result", {
        users: [],
        projects: [],
        tasks: [],
      }),
    );
  }

  const regex = new RegExp(q, "i");

  let projectQuery;

  if (req.user.role === "admin") {
    projectQuery = {
      owner: req.user._id,
    };
  } else {
    projectQuery = {
      "members.user": req.user._id,
    };
  }

  const accessibleProjects = await Project.find(projectQuery)
    .select("_id name status members")
    .lean();

  const projectIds = accessibleProjects.map((project) => project._id);

  const projects = accessibleProjects
    .filter((project) => regex.test(project.name))
    .slice(0, 5)
    .map(({ _id, name, status }) => ({
      _id,
      name,
      status,
    }));

  const tasks = await Task.find({
    project: { $in: projectIds },
    title: regex,
  })
    .select("title status priority project")
    .limit(5)
    .lean();

  let users = [];

  if (req.user.role === "admin") {
    const memberIds = [
      ...new Set(
        accessibleProjects.flatMap((project) =>
          project.members.map((member) => member.user?.toString()),
        ),
      ),
    ];

    users = await User.find({
      _id: { $in: memberIds },
      fullname: regex,
    })
      .select("fullname email role")
      .limit(5)
      .lean();
  }

  return res.json(
    new ApiResponse(200, "Search Result", {
      users,
      projects,
      tasks,
    }),
  );
});
