import express from 'express';
import resumeController from "../controllers/resumeController.js";
import authMiddleware from '../middlewares/authMiddleware.js';
import { handleUpload } from '../config/fileupload.js';

const router = express.Router();

router.post("/upload-resume", authMiddleware, handleUpload, resumeController.uploadResume);
router.get("/resumes", authMiddleware, resumeController.getResumes);
router.delete("/delete-resume/:resumeId", authMiddleware, resumeController.deleteResume);

export default router;