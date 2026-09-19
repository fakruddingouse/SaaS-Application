import { useState } from "react";
import toast from "react-hot-toast";

import LoadingAnimation from "../LoadingAnimation";
import { deleteResume } from "../../api/resumeApi";

const scoreColor = (score) => {
  if (score === null || score === undefined) return "bg-gray-100 text-gray-500";
  if (score >= 80) return "bg-green-100 text-green-700";
  if (score >= 50) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const ResumeOutput = ({ resume, loading, setResume, setRefreshResumes }) => {

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!resume?._id) {
      toast.error("Invalid resume.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await deleteResume(resume._id);
      toast.success("Resume deleted successfully!");

      setResume(null);
      setRefreshResumes(prev => prev + 1);
    } catch (error) {
      console.error("Delete resume error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete resume."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingAnimation message="Gemini is analyzing your resume..." />;
  }

  if (!resume) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
        <div className="text-6xl">📄</div>

        <h2 className="mt-6 text-2xl font-semibold">
          Your resume review will appear here
        </h2>

        <p className="mt-3 text-gray-500">
          Upload a PDF resume to get an AI-powered ATS review.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{resume.fileName}</h2>

          {resume.createdAt && (
            <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
              <span>📅 {new Date(resume.createdAt).toLocaleDateString()}</span>
              <span>{new Date().toLocaleTimeString()}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className={`px-5 py-3 rounded-2xl text-center font-bold ${scoreColor(resume.score)}`}>
            <div className="text-2xl leading-none">
              {resume.score ?? "—"}
            </div>
            <div className="text-xs font-medium mt-1">ATS Score</div>
          </div>

          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
            onClick={handleDelete}
          >
            {deleting ? "Deleting..." : "🗑️ Delete"}
          </button>
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="border-t pt-6">
          <p className="text-gray-700 leading-7">{resume.summary}</p>
        </div>
      )}

      {/* Strengths + Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">✅ Strengths</h3>
          <ul className="space-y-2">
            {resume.strengths?.length ? resume.strengths.map((s, i) => (
              <li key={i} className="text-sm text-gray-600 bg-green-50 rounded-lg px-3 py-2">
                {s}
              </li>
            )) : (
              <li className="text-sm text-gray-400">None identified.</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">⚠️ Weaknesses</h3>
          <ul className="space-y-2">
            {resume.weaknesses?.length ? resume.weaknesses.map((w, i) => (
              <li key={i} className="text-sm text-gray-600 bg-red-50 rounded-lg px-3 py-2">
                {w}
              </li>
            )) : (
              <li className="text-sm text-gray-400">None identified.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-800 mb-3">💡 Suggestions</h3>
        <ul className="space-y-2">
          {resume.suggestions?.length ? resume.suggestions.map((s, i) => (
            <li key={i} className="text-sm text-gray-600 flex gap-2">
              <span>•</span><span>{s}</span>
            </li>
          )) : (
            <li className="text-sm text-gray-400">No suggestions.</li>
          )}
        </ul>
      </div>

      {/* Missing Keywords */}
      {resume.missingKeywords?.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-3">🔑 Missing Keywords</h3>
          <div className="flex flex-wrap gap-2">
            {resume.missingKeywords.map((kw, i) => (
              <span key={i} className="text-xs bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Raw extracted text, tucked away */}
      <details className="mt-6 border-t pt-4">
        <summary className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700">
          View extracted resume text
        </summary>
        <div className="mt-3 text-sm text-gray-600 whitespace-pre-wrap max-h-64 overflow-y-auto bg-gray-50 rounded-lg p-4">
          {resume.extractedText}
        </div>
      </details>
    </div>
  );
};

export default ResumeOutput;