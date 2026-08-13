import { useState } from "react";
import Navbar from "../../components/Navbar";
import BlogForm from "../../components/blog/BlogForm";
import BlogOutput from "../../components/blog/BlogOutput";
import BlogHistory from "../../components/blog/BlogHistory";

const BlogWriter = ({ user }) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshBlogs, setRefreshBlogs] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">

      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800">
            📝 AI Blog Writer
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Generate SEO-friendly articles in seconds.
          </p>
        </div>


        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">

          {/* LEFT - Blog History */}
          <aside>
            <BlogHistory
              setLoading={setLoading}
              refreshBlogs={refreshBlogs}
              setBlog={setBlog}
            />
          </aside>


          {/* RIGHT - Blog Generator + Output */}
          <main>

            {/* Blog Form */}
            <BlogForm
              setBlog={setBlog}
              loading={loading}
              setLoading={setLoading}
              setRefreshBlogs={setRefreshBlogs}
            />


            {/* Blog Output */}
            <div className="mt-8">
              <BlogOutput
                blog={blog}
                loading={loading} 
                setBlog={setBlog} 
                setRefreshBlogs={setRefreshBlogs}
              />
            </div>

          </main>

        </div>

      </div>

    </div>
  );
};

export default BlogWriter;