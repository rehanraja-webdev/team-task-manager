import Activity from "../models/activity.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getTaskActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({ task: req.params.taskId })
    .populate("user", "fullname email")
    .sort({ createdAt: -1 });

  if (activities.length === 0) {
    throw new ApiError(404, "No activities found!");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Activities fetched successfully!", activities));
});

export default { getTaskActivities };
