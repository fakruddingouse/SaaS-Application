import api from "./axios";

export const generateBlog = async (blogData) => {
    const response = await api.post("/ai/blog", blogData);

    return response.data;
};