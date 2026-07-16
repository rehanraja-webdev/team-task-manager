import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import jobQueue from "../utils/jobQueue.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  res.status(200).json(new ApiResponse(200, "All users fetched!", users));
});

const getQueueStats = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(
      new ApiResponse(200, "Queue Stats", { pending: jobQueue.getQueueSize }),
    );
});
export default { getAllUsers, getQueueStats };
