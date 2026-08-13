import { useState } from "react";
import toast from "react-hot-toast";
import { generateBlog } from "../../api/aiApi.js";

const BlogForm = ({ setBlog, loading, setLoading, setRefreshBlogs }) => {

  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [keywords, setKeywords] = useState("");


  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      toast.error("Please enter a topic!");
      return;
    }

    try {
      setLoading(true);
      setBlog(null);

      const response = await generateBlog({
        topic,
        tone,
        length,
        keywords
      });

      console.log("Backend response:", response);

      // Store the complete blog object
      setBlog(response.blog);

      // Tell BlogHistory to refresh
      setRefreshBlogs(prev => prev + 1);

    } catch (error) {

      console.error("Blog generation error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to generate blog."
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <form
      onSubmit={handleGenerate}
      className="bg-white rounded-3xl shadow-lg p-8 space-y-7"
    >

      {/* Topic */}
      <div>
        <label className="font-semibold text-gray-700">
          Blog Topic
        </label>

        <input
          type="text"
          placeholder="Ex: Future of Artificial Intelligence"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>


      {/* Tone + Length */}
      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="font-semibold text-gray-700">
            Tone
          </label>

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
          <label className="font-semibold text-gray-700">
            Length
          </label>

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


      {/* Keywords */}
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


      {/* Generate Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition duration-300 disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Generating..." : "✨ Generate Blog"}
      </button>

    </form>
  );
};

export default BlogForm;