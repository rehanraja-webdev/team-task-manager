import Notification from "../models/notification.model.js";

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id,
  })
    .sort({
      createdAt: -1,
    })
    .limit(20);

  res.json(new ApiResponse(200, "Notifications", notifications));
});

export const markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) throw new ApiError(404, "Notification not found");

  if (notification.user.toString() !== req.user._id.toString())
    throw new ApiError(403, "Unauthorized");

  notification.isRead = true;

  await notification.save();

  res.json(new ApiResponse(200, "Notification Updated", notification));
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

  res.json(new ApiResponse(200, "All notifications marked read"));
});
