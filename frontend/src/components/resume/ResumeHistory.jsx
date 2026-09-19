import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { getResumes } from "../../api/resumeApi";

const scoreColor = (score) => {
  if (score === null || score === undefined) return "bg-gray-100 text-gray-500";
  if (score >= 80) return "bg-green-100 text-green-700";
  if (score >= 50) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

const ResumeHistory = ({ setLoading, refreshResumes, setResume }) => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      try {
        const response = await getResumes();
        setResumes(response.resumes);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumes();
  }, [refreshResumes, setLoading]);

  const onSelectResume = (resume) => {
    setResume(resume);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">📚 Resume History</h2>

        <span className="text-sm bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
          {resumes.length}
        </span>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">📄</div>
          <p className="text-gray-500 text-sm">No resumes uploaded yet.</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
          {resumes.map((resume) => (
            <button
              key={resume._id}
              onClick={() => onSelectResume(resume)}
              className="
                w-full
                text-left
                p-4
                rounded-xl
                border
                border-gray-200
                bg-white
                hover:bg-blue-50
                hover:border-blue-300
                hover:shadow-sm
                transition
                duration-200
                cursor-pointer
              "
            >
              <div className="flex justify-between items-start gap-2">
                <h3 className="font-semibold text-gray-800 truncate">
                  {resume.fileName}
                </h3>

                <span
                  className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${scoreColor(resume.score)}`}
                >
                  {resume.score ?? "—"}
                </span>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">
                  {new Date(resume.createdAt).toLocaleDateString()}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeHistory;
