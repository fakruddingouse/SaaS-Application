import { useEffect, useState } from 'react';
import LoadingAnimation from '../LoadingAnimation';

const ImageOutput = ({ selectedFile, currentResult, loading }) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!selectedFile) {
      setImageUrl('');
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setImageUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  if (loading) {
    return (
      <LoadingAnimation message="Gemini is analyzing your image..." />
    );
  }

  if (!selectedFile || !imageUrl) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-16 text-center">
        <div className="text-6xl">🖼️</div>

        <h2 className="mt-6 text-2xl font-semibold">
          Your image description will appear here
        </h2>

        <p className="mt-3 text-gray-500">
          Upload an image to get an AI-powered image description.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 space-y-5">
      <h2 className="text-xl font-bold text-gray-800">
        Image Preview
      </h2>

      <img
        src={imageUrl}
        alt="Selected image preview"
        className="max-w-full max-h-[500px] mx-auto rounded-xl object-contain"
      />

      {currentResult?.description && (
        <div className="border-t pt-5">
          <h3 className="text-lg font-semibold text-gray-800">
            AI Description
          </h3>

          <p className="mt-2 text-gray-600 whitespace-pre-wrap">
            {currentResult.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageOutput;
