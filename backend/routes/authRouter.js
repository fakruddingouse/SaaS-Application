import authController from "../controllers/authControllers.js";
import express from "express";
const router = express.Router();

router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

export default router;