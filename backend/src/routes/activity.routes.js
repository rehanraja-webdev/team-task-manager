import express from "express";
import activityController from "../controllers/activity.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/activities/:taskId:
 *  get:
 *    summary: Get task activities
 *    tags: [Activities]
 *    description: Get all task activities of a task
 *    response:
 *      200:
 *        description: Activities found
 */
router.get("/:taskId", authMiddleware, activityController.getTaskActivities);

router.get(
  "/",
  authMiddleware,
  authorizeRoles("admin", "super-admin"),
  activityController.getAllActivities,
);

export default router;
