import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import analyticsController from "../../controllers/analytics.controller.js";
import authorizeRoles from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  analyticsController.getAnalytics,
);

export default router;
