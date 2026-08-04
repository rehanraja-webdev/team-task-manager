import asyncHandler from "../utils/asyncHandler.js";
import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import cache from "../utils/cache.js";
import cacheHelper from "../utils/cache.helper.js";
import Activity from "../models/activity.model.js";

const getAdminDashboard = asyncHandler(async (req, res) => {
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
    cacheHelper.deleteCache(cacheKey);
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

  const activities = await Activity.find().sort({ createdAt: -1 }).limit(10);
  const dashboardData = {
    totalProjects,
    totalTasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    completionRate,
    myAssignedTasks,
    activities,
  };

  cacheHelper.setCache(cacheKey, dashboardData);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Dashboard stats fetched successfully",
        dashboardData,
      ),
    );
});

const getMemberDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cacheKey = `member_dashboard_${userId}`;

  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Member dashboard fetched from cache",
          cached.data,
        ),
      );
  }

  const taskStats = await Task.aggregate([
    {
      $match: {
        assignedTo: userId,
      },
    },
    {
      $facet: {
        byStatus: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
        ],

        dueToday: [
          {
            $match: {
              dueDate: {
                $gte: new Date(new Date().setHours(0, 0, 0, 0)),
                $lte: new Date(new Date().setHours(23, 59, 59, 999)),
              },
            },
          },
          {
            $count: "count",
          },
        ],
      },
    },
  ]);

  let assignedTasks = 0;
  let completedTasks = 0;
  let inProgressTasks = 0;
  let todoTasks = 0;
  let dueToday = 0;

  taskStats[0].byStatus.forEach((item) => {
    assignedTasks += item.count;

    if (item._id === "todo") {
      todoTasks = item.count;
    }

    if (item._id === "in-progress") {
      inProgressTasks = item.count;
    }

    if (item._id === "done") {
      completedTasks = item.count;
    }
  });

  if (taskStats[0].dueToday.length) {
    dueToday = taskStats[0].dueToday[0].count;
  }

  const completionRate =
    assignedTasks === 0
      ? 0
      : Math.round((completedTasks / assignedTasks) * 100);

  const projects = await Project.find({
    "members.user": userId,
  })
    .select("name status createdAt")
    .sort({ createdAt: -1 });

  const upcomingTasks = await Task.find({
    assignedTo: userId,
    status: {
      $ne: "done",
    },
  })
    .select("title priority dueDate status")
    .sort({
      dueDate: 1,
    })
    .limit(5);

  const recentActivities = await Activity.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(8);

  const dashboardData = {
    assignedTasks,
    completedTasks,
    inProgressTasks,
    todoTasks,
    dueToday,
    completionRate,
    projects,
    upcomingTasks,
    recentActivities,
  };

  cacheHelper.setCache(cacheKey, dashboardData);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Member dashboard fetched successfully",
        dashboardData,
      ),
    );
});

export default { getAdminDashboard, getMemberDashboard };
