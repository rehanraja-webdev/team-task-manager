import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/role.middleware.js";
import adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/users",
  authMiddleware,
  authorizeRoles("super-admin", "admin"),
  adminController.getAllUsers,
);
export default router;
