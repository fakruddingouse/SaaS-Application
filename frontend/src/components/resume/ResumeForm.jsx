import React, { useState } from 'react';
import { uploadPdf } from '../../api/resumeApi';

const ResumeForm = () => {

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      setStatus({ type: 'error', message: "Please select a PDF file."});
      return;
    }
    setStatus(null);
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus({ type: 'error', message: "Please select a file first."});
      return;
    }
    setLoading(true);
    setStatus(null);

    try {
      const response = await uploadPdf(file);
      setStatus({ type: 'success', message: "Resume uploaded successfully."});
      console.log("Success: ", response.data);
    } catch (err) {
      const message = err.message?.data?.message || "Upload failed. Please try again.";
      setStatus({ type: 'error', message });
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <h2 className='text-lg'>Upload Resume</h2>
        <br />
        <input
          className='border-2 w-auto cursor-pointer'
          type="file"
          accept="application/pdf"
          name="resume"
          onChange={handleFileChange}
          disabled={loading}
        />

        <button
          className='bg-blue-400 px-2 mx-2 border rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          type="submit"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>

        {status && (
          <p className={status.type === 'error' ? 'text-red-500 mt-2' : 'text-green-600 mt-2'}>
            {status.message}
          </p>
        )}
      </form>
    </div>
  )
}

export default ResumeForm
