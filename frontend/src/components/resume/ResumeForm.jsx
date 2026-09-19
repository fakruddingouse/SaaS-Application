import { useState } from "react";
import toast from "react-hot-toast";
import { uploadResume } from "../../api/resumeApi";

const ResumeForm = ({ setResume, loading, setLoading, setRefreshResumes }) => {

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    try {
      setLoading(true);
      setResume(null);

      const response = await uploadResume(file);

      setResume(response.resume);
      setRefreshResumes(prev => prev + 1);
      toast.success("Resume reviewed successfully!");

    } catch (error) {
      console.error("Upload error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to review resume."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-white rounded-3xl shadow-lg p-8 space-y-7"
    >

      <div>
        <label className="font-semibold text-gray-700">
          Upload Resume (PDF)
        </label>

        <input
          type="file"
          accept="application/pdf"
          name="resume"
          onChange={handleFileChange}
          className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100"
        />

        {file && (
          <p className="mt-2 text-sm text-gray-500">
            Selected: {file.name}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition duration-300 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Analyzing..." : "✨ Review Resume"}
      </button>

    </form>
  );
};

export default ResumeForm;