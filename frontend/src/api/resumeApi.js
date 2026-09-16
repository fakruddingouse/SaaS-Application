import api from "./axios";

export const generateText = async (file) => {
  const formData = new FormData();

  formData.append("resume", file);

  return await api.post(
    "/resume/upload-resume",
    formData
  );
  /* return await api.post(
    `${backendURL}/resume/upload-resume`,
    formData
  ); */
};
