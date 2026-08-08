import { useState } from "react";
import Navbar from "../../components/Navbar";
import BlogForm from "../../components/blog/BlogForm";
import BlogOutput from "../../components/blog/BlogOutput";

const BlogWriter = ({ user }) => {
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <Navbar user={user} />

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-800">
            📝 AI Blog Writer
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Generate SEO-friendly articles in seconds.
          </p>
        </div>
        <div>
          <div className="mt-12">
            <BlogForm
              setBlog={setBlog}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <div className="mt-12">
            <BlogOutput blog={blog} loading={loading} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogWriter;
