import api from "./axios";

export const generateBlog = async (blogData) => {
    const response = await api.post("/ai/blog", blogData);

    return response.data;
};

export const getBlogs = async () => {
    const response = await api.get("/ai/blogs");

    return response.data;
}

export const deleteBlog = async (blogid) => {
    const response = await api.delete(`/ai/delete-blog/${blogid}`);

    return response.data;
}