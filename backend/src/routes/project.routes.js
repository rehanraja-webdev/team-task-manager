import express from "express";
import projectController from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create", projectController.createProject);
router.get("/get", projectController.getProjects);

export default router;
