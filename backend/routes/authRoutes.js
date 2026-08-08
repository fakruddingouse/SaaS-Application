import authController from "../controllers/authControllers.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/verify-otp", authController.verifyOTP);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshAccessToken);
router.post("/logout", authMiddleware, authController.logout);
router.post('/forgot-password-request', authController.requestForgotPassword);
router.post('/forgot-password-verify', authController.forgotPassword);

export default router;
