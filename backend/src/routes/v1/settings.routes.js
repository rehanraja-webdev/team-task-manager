import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import settingsController from "../../controllers/settings.controller.js";

const router = express.Router();

router.get("/", authMiddleware, settingsController.getSettings);

router.patch("/", authMiddleware, settingsController.updateSettings);

export default router;
