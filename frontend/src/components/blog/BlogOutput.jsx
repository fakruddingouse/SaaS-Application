import { useState } from "react";
import toast from "react-hot-toast";

import LoadingAnimation from "./LoadingAnimation";
import { deleteBlog } from "../../api/aiApi";

const BlogOutput = ({ blog, loading, setBlog, setRefreshBlogs }) => {

  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const copyAndNotify = async () => {
    if (!blog?.content) return;

    try {
      await navigator.clipboard.writeText(blog.content);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.log("Failed to copy:", err);
    }
  };

  const handleDelete = async () => {
    if (!blog?._id) {
      toast.error("Invalid blog.");
      return;
    }
    
    const confirmed = window.confirm(
      "Are you sure you want to delte this blog?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const response = await deleteBlog(blog._id);
      toast.success("Blog deleted successfully!");

      setBlog(null);
      setRefreshBlogs(prev => prev + 1);
    } catch (error) {
      console.error("Delete blog error:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete blog."
      );
    } finally {
      setDeleting(false);
    }
  };

  // Loading
  if (loading) {
    return <LoadingAnimation />;
  }

  // No blog selected/generated
  if (!blog) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
        <div className="text-6xl">📝</div>

        <h2 className="mt-6 text-2xl font-semibold">
          Your generated blog will appear here
        </h2>

        <p className="mt-3 text-gray-500">
          Enter a topic and click Generate Blog.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{blog.topic}</h2>

          <div className="flex gap-3 mt-2 text-sm text-gray-500">
            <span>🎯 {blog.tone}</span>

            {blog.length && <span>📏 {blog.length}</span>}

            {blog.createdAt && (
              <span>📅 {new Date(blog.createdAt).toLocaleDateString()}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={copyAndNotify}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
          >
            {copied ? "✅ Copied" : "📋 Copy"}
          </button>

          <button className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition cursor-pointer">
            ⬇ Download
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-green-600 transition cursor-pointer"
            onClick={handleDelete}
          >
            {deleting ? "Deleting..." : "🗑️ Delete"}
          </button>
        </div>
      </div>

      {/* Blog Content */}
      <div className="border-t pt-6">
        <div className="prose prose-lg max-w-none whitespace-pre-wrap leading-8 text-gray-700">
          {blog.content}
        </div>
      </div>
    </div>
  );
};

export default BlogOutput;
