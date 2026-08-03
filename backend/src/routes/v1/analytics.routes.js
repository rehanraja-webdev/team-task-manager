import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import analyticController from "../../controllers/analytics.controller.js";
import authorizeRoles from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/overview",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticController.analyticsOverview,
);

router.get(
  "/monthly-task",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticController.monthlyTask,
);

router.get(
  "/progress",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticController.projectProgress,
);

router.get(
  "/contributors",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticController.getTopContributors,
);

router.get(
  "/overdue",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticController.getOverdueTasks,
);

export default router;
