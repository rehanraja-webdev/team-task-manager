import express from "express";
import projectController from "../controllers/project.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, projectController.createProject);
router.get("/get", authMiddleware, projectController.getProjects);

export default router;
