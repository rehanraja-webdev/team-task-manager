import Activity from "../models/activity.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getTaskActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({ task: req.params.taskId })
    .populate("user", "fullname email")
    .sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, "Activities fetched successfully!", activities));
});

const getAllActivities = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const activities = await Activity.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Activity.countDocuments();

  res.json({
    activities,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    hasMore: skip + activities.length < total,
  });
});

export default { getTaskActivities, getAllActivities };
