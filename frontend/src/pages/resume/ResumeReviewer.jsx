import { useState } from "react";
import Navbar from "../../components/Navbar";
import ResumeForm from "../../components/resume/ResumeForm";
import ResumeOutput from "../../components/resume/ResumeOutput";
import ResumeHistory from "../../components/resume/ResumeHistory";

const ResumeReviewer = ({ user }) => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshResumes, setRefreshResumes] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">

      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800">
            📝 AI Resume Reviewer
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Review your resume and get the accurate ATS Score.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

          <aside>
            <ResumeHistory
              setLoading={setLoading}
              refreshResumes={refreshResumes}
              setResume={setResume}
            />
          </aside>

          <main>
            <ResumeForm
              setResume={setResume}
              loading={loading}
              setLoading={setLoading}
              setRefreshResumes={setRefreshResumes}
            />

            <div className="mt-8">
              <ResumeOutput
                resume={resume}
                loading={loading}
                setResume={setResume}
                setRefreshResumes={setRefreshResumes}
              />
            </div>
          </main>

        </div>

      </div>

    </div>
  );
};

export default ResumeReviewer;