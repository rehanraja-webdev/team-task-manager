import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import dashboardController from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/stats", authMiddleware, dashboardController.getDashboardStats);
export default router;
