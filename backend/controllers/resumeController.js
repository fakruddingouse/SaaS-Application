import { uploadPdf } from "../services/pdfService.js";

/*
@ POST request - upload resume as pdf
*/
const generateText = async (req, res) => {
  console.log("🔥 generateText controller reached");

  try {
    console.log("req.file:", req.file);
    console.log("req.body:", req.body);

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume PDF is required!",
      });
    }

    console.log("Filename:", req.file.originalname);
    console.log("Mimetype:", req.file.mimetype);
    console.log("Size:", req.file.size);

    const text = await uploadPdf(req.file);

    console.log("🔥 Extracted text:");
    console.log(text);

    return res.status(200).json({
      success: true,
      message: "Successfully uploaded resume!",
      data: text,
    });
  } catch (err) {
    console.error("❌ Resume upload error:", err);

    return res.status(500).json({
      success: false,
      message: "Resume upload error!",
      error: err.message,
    });
  }
};


const resumeController = {
    generateText,
};

export default resumeController;
