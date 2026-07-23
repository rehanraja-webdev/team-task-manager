import express from "express";
import projectController from "../../controllers/project.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import authorizeRoles from "../../middlewares/role.middleware.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     summary: Create project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: E-commerce
 *               description:
 *                 type: string
 *                 example: E-commerce backend description
 *     responses:
 *       201:
 *         description: Project created successfully
 *       500:
 *         description: Failed to create project
 *       403:
 *         description: Only Admin can create project
 */
router.post(
  "/",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  projectController.createProject,
);

/**
 * @swagger
 * /api/v1/projects/{projectId}:
 *   delete:
 *     summary: Delete a project
 *     description: Delete a project with project ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project to delete
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       500:
 *         description: Failed to delete project
 */
router.delete(
  "/:projectId",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  projectController.deleteProject,
);

/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     summary: Get All Projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: All Projects fetched successfully
 *       404:
 *         description: Project not found
 */
router.get("/", authMiddleware, projectController.getProjects);

/**
 * @swagger
 * /api/v1/projects/{projectId}/member:
 *   post:
 *     summary: Add project member
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     responses:
 *       200:
 *         description: Member added successfully
 *       400:
 *         description: member already exists
 *       403:
 *         description: Only owner can add member
 *       404:
 *         description: User not found
 */
router.post("/:projectId/member", authMiddleware, projectController.addMember);

/**
 * @swagger
 * /api/v1/projects/{projectId}/members:
 *   get:
 *     summary: Get All Project Members
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     responses:
 *       200:
 *         description: All Project members fetched successfully
 *       404:
 *         description: Project not found
 */
router.get(
  "/:projectId/members",
  authMiddleware,
  projectController.getProjectMembers,
);

export default router;
