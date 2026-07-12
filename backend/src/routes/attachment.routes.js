import express from "express";
import attachmentController from "../controllers/attachment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.post(
  "/:taskId",
  authMiddleware,
  upload.single("file"),
  attachmentController.uploadAttachment,
);
router.get("/:taskId", authMiddleware, attachmentController.getTaskAttachments);

router.delete("/:attachmentId", authMiddleware, attachmentController.deleteAttachment);

export default router;
