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

  const [users, projects, tasks] = await Promise.all([
    User.find({
      fullname: regex,
    })
      .select("fullname email role")
      .limit(5),

    Project.find({
      name: regex,
    })
      .select("name status")
      .limit(5),

    Task.find({
      title: regex,
    })
      .select("title status priority")
      .limit(5),
  ]);

  res.json(
    new ApiResponse(200, "Search Result", {
      users,
      projects,
      tasks,
    }),
  );
});
