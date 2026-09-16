import React, { useState } from 'react';
import { generateText } from '../../api/resumeApi';


const ResumeForm = () => {

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a pdf file!")
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      const response = await generateText(file);
      console.log("Success: ", response.data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  }

  return (
    <div>
      
      <form onSubmit={handleUpload}>
        <h2 className='text-lg'>Upload Resume</h2>
        <br />
        <input className='border-2 w-auto cursor-pointer' type="file" accept="application/pdf" name="resume" onChange={handleFileChange} />

        <button className='bg-blue-400 px-2 mx-2 border rounded-sm cursor-pointer' type="submit">Upload</button>
      </form>
    </div>
  )
}

export default ResumeForm
