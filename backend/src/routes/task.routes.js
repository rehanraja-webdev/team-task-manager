import express from "express";
import taskController from "../controllers/task.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validateTask from "../middlewares/validateTask.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/tasks/:
 *  post:
 *    summary: Create Task
 *    tags: [Task]
 *    response:
 *      201:
 *        description: Task created successfully
 */
router.post("/", authMiddleware, validateTask, taskController.createTask);

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
