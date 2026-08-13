import express from "express";
import aiController from "../controllers/aiController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/blog", authMiddleware, aiController.createBlog);
router.get("/blogs", authMiddleware, aiController.getBlogs);
router.delete("/delete-blog/:blogid", authMiddleware, aiController.deleteBlog);

export default router;