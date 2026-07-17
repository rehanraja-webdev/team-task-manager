import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validateRegister from "../middlewares/validation.middleware.js";
import { loginLimiter } from "../middlewares/rateLimit.middleware.js";
const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *    summary: Register User
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *    response:
 *      201:
 *        description: User registered successfully
 */
router.post("/register", validateRegister, authController.registerUser);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    summary: Login User
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *    response:
 *      200:
 *        description: User logged in successfully
 */
router.post("/login", loginLimiter, authController.loginUser);

router.post("/logout", authController.logoutUser);
router.get("/me", authMiddleware, authController.getCurrentUser);

export default router;
