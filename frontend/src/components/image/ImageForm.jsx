import toast from 'react-hot-toast';
import { uploadImage } from '../../api/imageApi';

const ImageForm = ({ selectedFile, setSelectedFile, setCurrentResult,loading, setLoading }) => {

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];

        if (!selectedFile) return;

        const allowedTypes = ['image/png', 'image/jpeg'];

        if (!allowedTypes.includes(selectedFile.type)) {
            toast.error("Please select a PNG or JPG image.");
            e.target.value = "";
            return;
        }
        setSelectedFile(selectedFile);
        setCurrentResult(null);
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error("Please select an image.");
            return;
        }

        try {
            setLoading(true);
            const response = await uploadImage(selectedFile);

            setCurrentResult(response.image);
            toast.success("Image Uploaded Successfully");

        } catch (error) {
            console.log("Image Upload Error:", error)
            console.log(error.message)
            toast.error(
                error.response?.data?.message || 
                "Failed to upload image."
            );
        } finally {
            setLoading(false);
        }
    }

  return (
    <form
        onSubmit={handleUpload}
        className="bg-white rounded-3xl shadow-lg p-8 space-y-7"
    >
        <div>
            <label className='font-semibold text-gray-700'>
                Upload Image (.png, .jpg, .jpeg)
            </label>

            <input
             type="file" 
             accept='image/*' 
             name="image" 
             onChange={handleImageChange} 
             className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 file:font-semibold hover:file:bg-blue-100"
            />
            {selectedFile && (
                <p className="mt-2 text-sm text-gray-500">
                    Selected: {selectedFile.name}
                </p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white my-3 py-3 rounded-xl font-semibold hover:scale-[1.02] transition duration-300 disabled:opacity-60 cursor-pointer"
            >
                {loading ? "Analyzing..." : "✨ Describe Image"}
            </button>
        </div> 
    </form>
  )
}

export default ImageForm
