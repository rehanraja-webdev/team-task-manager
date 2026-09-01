import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import dashboardController from "../controllers/dashboard.controller.js";
import authorizeRoles from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/stats",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  dashboardController.getAdminDashboard,
);

router.get("/member", authMiddleware, dashboardController.getMemberDashboard);
export default router;
