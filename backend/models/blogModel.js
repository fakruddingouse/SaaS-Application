import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    }, 
    topic: {
        type: String, 
        required: true, 
        trim: true
    }, 
    tone: {
        type: String, 
        required: true
    }, 
    length: {
        type: String, 
        required: true
    }, 
    keywords: {
        type: [String], 
        default: []
    }, 
    content: {
        type: String, 
        required: true
    }
}, { timestamps: true} )

const Blog = new mongoose.model("Blog", blogSchema);

export default Blog;