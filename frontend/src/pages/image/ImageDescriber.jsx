import { useState } from 'react';
import Navbar from '../../components/Navbar';
import ImageForm from '../../components/image/ImageForm';
import ImageHistory from '../../components/image/ImageHistory';
import ImageOutput from '../../components/image/ImageOutput'

const ImageDescriber = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentResult, setCurrentResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-4 py-10">

        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800">
            📝 AI Image Describer
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Describe your image features and generate an accurate description using AI.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8">
            <aside>
              <ImageHistory  
                setCurrentResult={setCurrentResult}
              />
            </aside>

            <main>
              <ImageForm
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                setCurrentResult={setCurrentResult}
                loading={loading}
                setLoading={setLoading}
              />

              <div className="mt-8">
                <ImageOutput 
                  selectedFile={selectedFile}
                  currentResult={currentResult}
                  loading={loading}
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageDescriber;
