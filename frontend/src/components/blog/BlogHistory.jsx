import { useState, useEffect } from "react";
import toast from "react-hot-toast";

import { getBlogs } from "../../api/aiApi";

const BlogHistory = ({ setLoading,  refreshBlogs, setBlog }) => {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {

    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await getBlogs();

        console.log("Response:", response.blogs);
        console.log("Number of blogs:", response.blogs.length);

        setBlogs(response.blogs);

      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();

  }, [refreshBlogs, setLoading]);


  // Select a blog from history
  const onSelectBlog = (blog) => {
    setBlog(blog);
  };


  return (
    <div className="bg-white rounded-3xl shadow-lg p-5">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-xl font-bold text-gray-800">
          📚 Blog History
        </h2>

        <span className="text-sm bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
          {blogs.length}
        </span>

      </div>


      {/* Empty State */}
      {blogs.length === 0 ? (

        <div className="text-center py-10">

          <div className="text-4xl mb-3">
            📝
          </div>

          <p className="text-gray-500 text-sm">
            No blogs generated yet.
          </p>

        </div>

      ) : (

        <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">

          {blogs.map((blog) => (

            <button
              key={blog._id}
              onClick={() => onSelectBlog(blog)}
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

              <h3 className="font-semibold text-gray-800 truncate">
                {blog.topic}
              </h3>

              <div className="flex justify-between items-center mt-2">

                <span className="text-xs text-gray-500">
                  {blog.tone}
                </span>

                <span className="text-xs text-gray-400">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>

              </div>

            </button>

          ))}

        </div>

      )}

    </div>
  );
};

export default BlogHistory;