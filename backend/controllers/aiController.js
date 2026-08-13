import Blog from "../models/blogModel.js";
import { generateBlog } from "../services/geminiService.js";

const createBlog = async (req, res) => {
    try {
        const { topic, tone, length, keywords } = req.body;

        if (!topic) {
            return res.status(400).json({
                success: false,
                message: "Topic is required."
            });
        }

        const keywordArray = keywords ? keywords.split(",").map(k => k.trim()).filter(Boolean) : [];

        const content = await generateBlog({
            topic, tone, length, keywords
        })
        
        const blog = await Blog.create({
            user: req.user.id, 
            topic, 
            tone, 
            length, 
            keywords: keywordArray, 
            content
        })
        
        return res.status(201).json({
            success: true, 
            message: "Blog generated successfully.", 
            blog
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong."
        });
    }
}

// GET Logged in user's blog history
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({
            user: req.user.id
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true, 
            message: "Successfully fetched all blogs", 
            blogs
        })
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch blog history."
        });
    }
}

// DELETE Logged in user's blog
const deleteBlog = async (req, res) => {
    try {
        const { blogid } = req.params;

        const blog = await Blog.findOne({
            _id: blogid, 
            user: req.user.id
        })

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found."
            });
        }

        await Blog.deleteOne({
            _id: blogid,
            user: req.user.id
        });

        return res.status(200).json({
            success: true, 
            message: "Blog successfully deleted." 
        })
    } catch (error) {
        console.error("Delete blog error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete blog."
        });
    }
}

const aiController = {
    createBlog, 
    getBlogs, 
    deleteBlog
}

export default aiController