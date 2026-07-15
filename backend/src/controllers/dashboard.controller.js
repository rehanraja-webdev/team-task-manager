import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import cache from "../utils/cache.js";
import cacheHelper from "../utils/cache.helper.js";

const getDashboardStats = asyncHandler(async (req, res) => {
  //created cache key
  const cacheKey = `dashboard_${req.user._id}`;
  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    console.log("Cache Hit:", cacheKey);
    return res
      .status(200)
      .json(new ApiResponse(200, "From cache", cached.data));
  } else {
    console.log("Cache Miss:", cacheKey);
    cache.delete(cacheKey);
  }

  // if (cache.has(cacheKey)) {
  //   return res
  //     .status(200)
  //     .json(
  //       new ApiResponse(
  //         200,
  //         "Dashboard fetched from cache",
  //         cache.get(cacheKey),
  //       ),
  //     );
  // }

  //number of project user own
  const totalProjects = await Project.countDocuments({
    owner: req.user._id,
  });

  const projects = await Project.find({
    owner: req.user._id,
  }).select("_id");

  //store project ids in array
  const projectIds = await projects.map((project) => project._id);

  const totalTasks = await Task.countDocuments({
    //$in will find all task whose project is any of these ids
    project: {
      $in: projectIds,
    },
  });

  const taskStats = await Task.aggregate([
    {
      //$match"-> Only keep tasks whose project id exists in projectIds array
      $match: {
        project: {
          $in: projectIds,
        },
      },
    },
    {
      //Group all tasks by status(eg:- todo: 4, in-progress: 2, done: 5) and count how many tasks exist in each group.
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  let todoTasks = 0;
  let inProgressTasks = 0;
  let doneTasks = 0;

  taskStats.map((item) => {
    if (item._id === "todo") {
      todoTasks = item.count;
    }

    if (item._id === "in-progress") {
      inProgressTasks = item.count;
    }
    if (item._id === "done") {
      doneTasks = item.count;
    }
  });

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((doneTasks / totalTasks) * 100);

  const myAssignedTasks = await Task.countDocuments({
    assignedTo: req.user._id,
  });

  cacheHelper.setCache(cacheKey, {
    totalProjects,
    totalTasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    completionRate,
    myAssignedTasks,
  });

  res.status(200).json(
    new ApiResponse(200, "Dashboard stats fetched successfully", {
      totalProjects,
      totalTasks,
      todoTasks,
      inProgressTasks,
      doneTasks,
      completionRate,
      myAssignedTasks,
    }),
  );
});

export default { getDashboardStats };
