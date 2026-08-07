const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center py-16">
      <div className="w-14 h-14 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

      <p className="mt-6 text-gray-500 text-lg">
        Gemini is writing your article...
      </p>
    </div>
  );
};

export default LoadingAnimation;
