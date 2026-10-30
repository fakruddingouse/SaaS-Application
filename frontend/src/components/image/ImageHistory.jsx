import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { getImages } from "../../api/imageApi";

const ImageHistory = ({ setCurrentResult }) => {
  const [images, setImages] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setHistoryLoading(true);

      try {
        const response = await getImages();
        setImages(response.images);
      } catch (error) {
        toast.error(error.message);
        console.log(error.message);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchImages();
  }, []);

  const onSelectImage = (image) => {
    setCurrentResult(image);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-5">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-gray-800">
          🖼️ Images History
        </h2>

        <span className="text-sm bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
          {images.length}
        </span>
      </div>

      {historyLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-500 text-sm">
            Loading images...
          </p>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">🖼️</div>
          <p className="text-gray-500 text-sm">
            No images described yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
          {images.map((image) => (
            <button
              key={image._id}
              type="button"
              onClick={() => onSelectImage(image)}
              className="
                w-full text-left p-4 rounded-xl border border-gray-200
                bg-white hover:bg-blue-50 hover:border-blue-300
                hover:shadow-sm transition duration-200 cursor-pointer
              "
            >
              <div className="flex items-start gap-3">
                <img
                  src={image.imageUrl}
                  alt="Described image"
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-800 line-clamp-2">
                    {image.description || "Image description"}
                  </h3>

                  <div className="flex items-center mt-2">
                    <span className="text-xs text-gray-400">
                      {new Date(image.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageHistory;
