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

/**
 * @GET Request
 * @ Retrieve all blogs
 */
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user.id }).sort({ date: -1 });

    return res.status(200).json({
      success: true,
      message: "Successfully fetched all blogs",
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong"
    });
  }
};


const aiController = {
    createBlog, 
    getAllBlogs
}

export default aiController