import { useState } from "react";
import axios from "axios";
import api from "../../api/axios.js"
import { generateBlog } from "../../api/aiApi.js";

const BlogForm = ({ setBlog, loading, setLoading }) => {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [keywords, setKeywords] = useState("");

  /* const handleGenerate = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    // Backend call will come here later.

    console.log({
      topic,
      tone,
      length,
      keywords,
    });

    const response = await axios.post(
        "http://localhost:4000/api/ai/blog",
        {
            topic,
            tone,
            length,
            keywords,
        }
    );

    setLoading(true);

    setTimeout(() => {
      setBlog(
        `# ${topic}

        This is where the AI-generated blog will appear.

        Tone:
        ${tone}

        Length:
        ${length}

        Keywords:
        ${keywords}`,
            );

      setLoading(false);
    }, 2000);
  }; */

  const handleGenerate = async (e) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }
    try {
      setLoading(true);
      setBlog("");

      const response = await generateBlog({
        topic, tone, length, keywords
      })
      console.log("Backend response: ", response);

      setBlog(response.blog.content);

    } catch (error) {
      console.error("Blog generation error:", error);

      alert(
          error.response?.data?.message ||
          "Failed to generate blog."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleGenerate} className="bg-white rounded-3xl shadow-lg p-8 space-y-7">
      <div>
        <label className="font-semibold text-gray-700">Blog Topic</label>

        <input
          type="text"
          placeholder="Ex: Future of Artificial Intelligence"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="font-semibold text-gray-700">Tone</label>

          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full mt-2 border rounded-xl px-4 py-3"
          >
            <option>Professional</option>
            <option>Casual</option>
            <option>Friendly</option>
            <option>Persuasive</option>
            <option>Educational</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-gray-700">Length</label>

          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="w-full mt-2 border rounded-xl px-4 py-3"
          >
            <option>Short</option>
            <option>Medium</option>
            <option>Long</option>
          </select>
        </div>
      </div>

      <div>
        <label className="font-semibold text-gray-700">
          Keywords (Optional)
        </label>

        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="react,nodejs,mern"
          className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition duration-300 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Generating..." : "✨ Generate Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
