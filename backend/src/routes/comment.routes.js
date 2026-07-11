import express from "express";
import commentController from "../controllers/comment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post("/:taskId", authMiddleware, commentController.addComment);
router.get("/:taskId", authMiddleware, commentController.getTaskComments);

export default router;
