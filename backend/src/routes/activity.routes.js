import express from "express";
import activityController from "../controllers/activity.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:taskId", authMiddleware, activityController.getTaskActivities);

export default router;
