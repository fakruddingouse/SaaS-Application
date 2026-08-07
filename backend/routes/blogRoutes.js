import authController from "../controllers/authControllers.js";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/blog-writer", authMiddleware);

export default router;