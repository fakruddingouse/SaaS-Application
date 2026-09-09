import express from "express";
import multer from "multer";

const app = express();

const upload = multer({
  storage: multer.memoryStorage(),
});

app.post("/api/resume/resume-upload", upload.single("file"), (req, res) => {
  console.log(req.file);

  res.json({
    message: "PDF uploaded successfully",
    filename: req.file.originalname,
  });
});
