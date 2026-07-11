import express from "express";
import taskController from "../controllers/task.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, taskController.createTask);

router.get(
  "/project/:projectId",
  authMiddleware,
  taskController.getProjectTasks,
);

router.patch(
  "/:taskId/status",
  authMiddleware,
  taskController.updateTaskStatus,
);

export default router;
