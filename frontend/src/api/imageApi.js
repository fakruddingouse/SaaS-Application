import api from "./axios";

export const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await api.post("/image/upload-image", formData);
    return response.data;
}

export const getImages = async () => {
    const response = await api.get("/image/images");
    return response.data;
}

// still deleteImage function need to be written