import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const FEATURES = [
  {
    id: "blog",
    name: "Blog / Article Writer",
    desc: "Draft structured articles from a topic and a few notes.",
    path: "/blog-writer",
    emoji: "📝",
  },
  {
    id: "resume",
    name: "Resume Reviewer",
    desc: "Get scored feedback and rewrite suggestions.",
    path: "/resume-reviewer",
    emoji: "📄",
  },
  {
    id: "image",
    name: "Image Studio",
    desc: "Upload or describe an image for AI analysis.",
    path: "/image-studio",
    emoji: "🖼️",
  },
  {
    id: "chat",
    name: "Chat Assistant",
    desc: "Ask anything in a persistent conversation.",
    path: "/chat",
    emoji: "💬",
  },
  {
    id: "credits",
    name: "Usage & Credits",
    desc: "See how many AI calls you have left today.",
    path: "/credits",
    emoji: "⚡",
  },
];

const HomePage = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">

      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center">

          <h1 className="text-5xl font-extrabold text-gray-800">

            What do you want to create today?

          </h1>

          <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">

            Powerful AI tools to write, analyze, chat, and create—
            all in one place.

          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">

          {FEATURES.map((feature) => (

            <button
              key={feature.id}
              onClick={() => navigate(feature.path)}
              className="
              group
              bg-white/70
              backdrop-blur-xl
              border
              border-white
              rounded-3xl
              p-7
              text-left
              shadow-lg
              hover:shadow-2xl
              transition-all
              duration-300
              hover:-translate-y-2
              cursor-pointer
              "
            >

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition">

                {feature.emoji}

              </div>

              <h2 className="mt-6 text-xl font-semibold text-gray-800">

                {feature.name}

              </h2>

              <p className="mt-3 text-gray-500 leading-relaxed">

                {feature.desc}

              </p>

              <div className="mt-6 text-blue-600 font-semibold flex items-center gap-2">

                Open Tool

                <span className="group-hover:translate-x-2 transition">
                  →
                </span>

              </div>

            </button>

          ))}

        </div>

      </div>

    </div>
  );
};

export default HomePage;