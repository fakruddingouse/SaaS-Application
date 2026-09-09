import express from 'express';
import multer from 'multer';
import resumeController from "../controllers/resumeController.js";
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

router.post("/upload-resume", authMiddleware, upload.single("file"), resumeController.generateText);

export default router;