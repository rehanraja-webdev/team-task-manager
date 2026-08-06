import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import UserSettings from "../models/userSettings.model.js";

const getSettings = asyncHandler(async (req, res) => {
  const settings = await UserSettings.findOne({
    user: req.user._id,
  });

  if (!settings) {
    throw new ApiError(404, "Settings not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Settings fetched successfully", settings));
});

const updateSettings = asyncHandler(async (req, res) => {
  const allowedFields = [
    "theme",
    "emailNotifications",
    "browserNotifications",
    "taskAssigned",
    "dueReminder",
    "projectUpdates",
  ];

  const updates = {};

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  const settings = await UserSettings.findOneAndUpdate(
    { user: req.user._id },
    { $set: updates },
    {
      new: true,
      runValidators: true,
    },
  );

  await settings.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Settings updated successfully", settings));
});

export default {
  getSettings,
  updateSettings,
};
