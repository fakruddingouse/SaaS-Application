import api from "./axios";

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await api.post("/resume/upload-resume", formData);

  return response.data;
};


export const getResumes = async () => {
  const response = await api.get("/resume/resumes");
  return response.data;
}

export const deleteResume = async (resumeId) => {
  const response = await api.delete(`/resume/delete-resume/${resumeId}`);
  return response.data;
}