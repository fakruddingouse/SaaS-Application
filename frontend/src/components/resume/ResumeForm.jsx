import React from 'react'
import { useState } from 'react';

const ResumeForm = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
  };

const handleUpload = async (e) => {
  e.preventDefault();

  console.log("Upload button clicked");
  console.log("Selected file:", file);

  if (!file) {
    alert("Please select a PDF first.");
    return;
  }

  try {
    const accessToken = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "http://localhost:4000/api/resume/upload-resume",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    console.log("Response status:", response.status);

    const result = await response.json();

    console.log("Backend response:", result);
  } catch (err) {
    console.error("Frontend upload error:", err);
  }
};

  return (
    <div>
      
      <form onSubmit={handleUpload}>
        <h2 className='text-lg'>Upload Resume</h2>
        <br />
        <input className='border-2 w-auto cursor-pointer' type="file" accept="application/pdf" onChange={handleFileChange} />

        <button className='bg-blue-400 px-2 mx-2 border-1 rounded-sm cursor-pointer' type="submit">Upload</button>
      </form>
    </div>
  )
}

export default ResumeForm
