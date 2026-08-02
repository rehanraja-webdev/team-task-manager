import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import analyticController from "../../controllers/analytics.controller.js";
import authorizeRoles from "../../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/overview",
  authMiddleware,
  authorizeRoles("super-admin"),
  analyticController.analyticsOverview,
);

export default router;
