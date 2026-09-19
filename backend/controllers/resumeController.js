import { uploadPdf } from "../services/pdfService.js";

/*
@ POST request - upload resume as pdf
*/
const uploadPdfController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required!",
      });
    }

    const text = await uploadPdf(req.file);

    return res.status(200).json({
      success: true,
      message: "Successfully uploaded resume!",
      data: text,
    });
  } catch (err) {
    console.error("Resume upload error:", err);

    return res.status(500).json({
      success: false,
      message: "Resume upload error!",
      error: err.message,
    });
  }
};


const resumeController = {
    uploadPdfController,
};

export default resumeController;
