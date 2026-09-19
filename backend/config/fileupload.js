import multer from "multer";

export const upload = multer({
    storage: multer.memoryStorage(), 
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max
    }, 
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error("Only PDF files are allowed!"));
        }
        cb(null, true);
    }
});

export const handleUpload = (req, res, next) => {
    upload.single('resume')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: false,
                    message: "File too large. Max size is 5MB.",
                });
            }
            return res.status(400).json({ success: false, message: err.message });
        } else if (err) {
            return res.status(400).json({ success: false, message: err.message || "Invalid file upload." });
        }
        next();
    });
};