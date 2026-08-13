import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import analyticsController from "../../controllers/analytics.controller.js";
import authorizeRoles from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/overview",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticsController.analyticsOverview,
);

router.get(
  "/monthly-task",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticsController.monthlyTask,
);

router.get(
  "/progress",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticsController.projectProgress,
);

router.get(
  "/contributors",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticsController.getTopContributors,
);

router.get(
  "/overdue",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticsController.getOverdueTasks,
);

export default router;
