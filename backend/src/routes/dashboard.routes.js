import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import dashboardController from "../controllers/dashboard.controller.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  authorizeRoles("admin"),
  dashboardController.getDashboardStats,
);
export default router;
