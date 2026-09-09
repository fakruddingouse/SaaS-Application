import { useState } from 'react';
import Navbar from "../../components/Navbar";
import ResumeForm from "../../components/resume/ResumeForm";

const ResumeReviewer = ({ user }) => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">

            <Navbar user={user} />

            <div className="max-w-7xl mx-auto px-4 py-10">

            {/* Header */}
                <div className="text-center mb-10">
                <h1 className="text-5xl font-bold text-gray-800">
                📝 AI Resume Reviewer
                </h1>

                <p className="mt-3 text-gray-500 text-lg">
                Review your resume and get the accurate ATS Score.
                </p>
                <ResumeForm />
                </div>
            </div>

        </div>
  );
}

export default ResumeReviewer;