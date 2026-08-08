import express from "express";
import aiController from "../controllers/aiController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/blog", authMiddleware, aiController.createBlog);
router.get("/get-all-blogs", authMiddleware, aiController.getAllBlogs)

export default router;