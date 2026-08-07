import LoadingAnimation from "./LoadingAnimation";

const BlogOutput = ({ blog, loading }) => {
  if (loading) {
    return <LoadingAnimation />;
  }

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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Generated Blog</h2>

        <div className="flex gap-3">
          <button
            onClick={() => navigator.clipboard.writeText(blog)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
          >
            📋 Copy
          </button>

          <button className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition cursor-pointer">
            ⬇ Download
          </button>
        </div>
      </div>

      <div className="prose prose-lg max-w-none whitespace-pre-wrap leading-8 text-gray-700">
        {blog}
      </div>
    </div>
  );
};

export default BlogOutput;
