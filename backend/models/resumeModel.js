import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fileName: {
        type: String,
        required: true,
        trim: true
    },
    extractedText: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        default: null
    },
    summary: {
        type: String,
        default: ""
    },
    strengths: {
        type: [String],
        default: []
    },
    weaknesses: {
        type: [String],
        default: []
    },
    suggestions: {
        type: [String],
        default: []
    },
    missingKeywords: {
        type: [String],
        default: []
    }
}, { timestamps: true });

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;