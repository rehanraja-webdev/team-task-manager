import express from "express";
import projectController from "../../controllers/project.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";
import authorizeRoles from "../../middlewares/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  projectController.createProject,
);

router.delete(
  "/:projectId",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  projectController.deleteProject,
);

/**
 * @swagger
 * /api/projects/:
 *  get:
 *    summary: Get All Projects
 *    tags: [Projects]
 *    response:
 *      200:
 *        description: All Projects fetched successfully
 */
router.get("/", authMiddleware, projectController.getProjects);

router.post("/:projectId/members", authMiddleware, projectController.addMember);

router.get(
  "/:projectId/members",
  authMiddleware,
  projectController.getProjectMembers,
);

export default router;
