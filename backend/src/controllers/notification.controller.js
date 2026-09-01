import Notification from "../models/notification.model.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

import cacheHelper from "../utils/cache.helper.js";
import cacheKeys from "../utils/cacheKeys.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cacheKey = cacheKeys.notifications(userId);

  const cached = cacheHelper.getCache(cacheKey);

  if (cached && cached.expiresAt > Date.now()) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Notifications fetched from cache", cached.data),
      );
  }

  if (cached) {
    cacheHelper.deleteCache(cacheKey);
  }

  const notifications = await Notification.find({
    user: userId,
  })
    .sort({
      createdAt: -1,
    })
    .limit(20)
    .lean();

  cacheHelper.setCache(cacheKey, notifications);

  return res
    .status(200)
    .json(new ApiResponse(200, "Notifications fetched!", notifications));
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    throw new ApiError(404, "Notification not found");
  }

  if (notification.user.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Unauthorized");
  }

  notification.isRead = true;

  await notification.save();

  await cacheHelper.deleteCache(cacheKeys.notifications(req.user._id));

  return res
    .status(200)
    .json(new ApiResponse(200, "Notification Updated", notification));
});

export const markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    {
      user: req.user._id,
      isRead: false,
    },
    {
      isRead: true,
    },
  );

  await cacheHelper.deleteCache(cacheKeys.notifications(req.user._id));

  return res
    .status(200)
    .json(new ApiResponse(200, "All notifications marked read"));
});
