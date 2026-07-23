import express from "express";
import taskController from "../controllers/task.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validateTask from "../middlewares/validateTask.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/tasks/:
 *   post:
 *     summary: Create Task
 *     tags: [Task]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - projectId
 *               - assignedTo
 *               - dueDate
 *             properties:
 *               title:
 *                 type: string
 *                 example: Add new feature
 *               description:
 *                 type: string
 *                 example: Create a new feature
 *               projectId:
 *                 type: string
 *                 example: Correct project id
 *               assignedTo:
 *                 type: string
 *                 example: User Id
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-08-30"
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Assigned user must be project member
 *       403:
 *         description: You are not project member
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to create task
 */
router.post("/", authMiddleware, validateTask, taskController.createTask);

/**
 * @swagger
 * /api/tasks/project/{projectId}:
 *   get:
 *     summary: Get Project Tasks
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     responses:
 *       200:
 *         description: Tasks fetched
 */
router.get(
  "/project/:projectId",
  authMiddleware,
  taskController.getProjectTasks,
);

/**
 * @swagger
 * /api/tasks/{taskId}/status:
 *   patch:
 *     summary: Update task status
 *     tags: [Task]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task
 *     responses:
 *       200:
 *         description: Task status updated
 *       400:
 *         description: Invalid task id
 *       404:
 *         description: No task found
 *       403:
 *         description: Only assigned member can update task status
 */
router.patch(
  "/:taskId/status",
  authMiddleware,
  taskController.updateTaskStatus,
);

export default router;
