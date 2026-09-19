import Resume from "../models/resumeModel.js";
import { uploadPdf } from "../services/pdfService.js";
import { generateResumeReview } from "../services/resumeService.js";

/* 
@ POST request - upload resume PDF, extract text, 
                generate AI review, and save
*/
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required!",
      });
    }

    const extractedText = await uploadPdf(req.file);

    const review = await generateResumeReview(extractedText);

    const resume = await Resume.create({
      user: req.user.id,
      fileName: req.file.originalname,
      extractedText,
      score: review.score,
      summary: review.summary,
      strengths: review.strengths,
      weaknesses: review.weaknesses,
      suggestions: review.suggestions,
      missingKeywords: review.missingKeywords,
    });

    return res.status(201).json({
      success: true,
      message: "Resume reviewed successfully!",
      resume,
    });
  } catch (err) {
    console.error("Resume upload error:", err);

    return res.status(500).json({
      success: false,
      message: err.message || "Resume upload error!",
    });
  }
};

// GET - logged-in user's resume history
const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Successfully fetched resume history",
      resumes,
    });
  } catch (error) {
    console.error("Get resumes error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume history.",
    });
  }
};

// DELETE - logged-in user's resume
const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user.id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    await Resume.deleteOne({
      _id: resumeId,
      user: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Resume successfully deleted.",
    });
  } catch (error) {
    console.error("Delete resume error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resume.",
    });
  }
};

const resumeController = {
  uploadResume,
  getResumes,
  deleteResume
};

export default resumeController;
