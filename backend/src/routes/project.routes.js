import express from "express";
import projectController from "../controllers/project.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, projectController.createProject);

router.delete(
  "/:projectId",
  authMiddleware,
  authorizeRoles("admin"),
  projectController.deleteProject,
);

router.get("/", authMiddleware, projectController.getProjects);

router.post("/:projectId/members", authMiddleware, projectController.addMember);

router.get(
  "/:projectId/members",
  authMiddleware,
  projectController.getProjectMembers,
);

export default router;
