import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import UserSettings from "../models/userSettings.model.js";

import cacheHelper from "../utils/cache.helper.js";
import cacheKeys from "../utils/cacheKeys.js";

const getSettings = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const key = cacheKeys.userSettings(userId);
  const cached = await cacheHelper.getCache(key);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Settings fetched from cache", cached.data));
  }

  if (cached) {
    await cacheHelper.deleteCache(key);
  }

  const settings = await UserSettings.findOne({
    user: userId,
  });

  if (!settings) {
    return res
      .status(200)
      .json(new ApiResponse(200, "Currently settings are empty!", []));
  }

  await cacheHelper.setCache(key, settings, (ttl = 5 * 60 * 1000));

  return res
    .status(200)
    .json(new ApiResponse(200, "Settings fetched successfully", settings));
});

const updateSettings = asyncHandler(async (req, res) => {
  const userId = req.user._id;

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
    { user: userId },
    { $set: updates },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    },
  );

  await cacheHelper.deleteCache(cacheKeys.userSettings(userId));

  return res
    .status(200)
    .json(new ApiResponse(200, "Settings updated successfully", settings));
});

export default {
  getSettings,
  updateSettings,
};
