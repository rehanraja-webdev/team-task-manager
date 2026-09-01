import express from "express";

import {
  getNotifications,
  markAsRead,
  markAllRead,
} from "../../controllers/notification.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getNotifications);

router.patch("/read-all", authMiddleware, markAllRead);

router.patch("/:id/read", authMiddleware, markAsRead);

export default router;
