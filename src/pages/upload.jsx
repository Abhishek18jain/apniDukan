import { useNavigate } from "react-router-dom";
import axiosInstance from "../utlis/axiosinstance";
import { useState } from "react";

const UploadBill = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return alert("Upload a file first");

    setIsUploading(true);
    const form = new FormData();
    form.append("bill", file);

    try {
      const res = await axiosInstance.post("/bill/upload", form);
      navigate(`/review/${res.data.billId}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Upload Your Bill
          </h2>
          <p className="text-gray-600 text-sm">
            Supports PDF, JPG, PNG up to 10MB
          </p>
        </div>

        <div className="space-y-6">
          <label className="block w-full">
            <div className={`
              border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer 
              transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50 
              ${file ? 'border-green-400 bg-green-50/50' : 'border-gray-300 bg-gray-50'}
              ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
                accept=".pdf,.jpg,.jpeg,.png"
                disabled={isUploading}
              />
              
              <div className="flex flex-col items-center space-y-4">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${file ? 'bg-green-100' : 'bg-gray-100'}
                `}>
                  {file ? (
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  )}
                </div>
                
                <div>
                  {file ? (
                    <>
                      <p className="text-green-700 font-medium text- break-words
 ">
                        {file.name}
                      </p>
                      <p className="text-green-600 text-sm mt-1">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 font-medium">
                        Click to select a file
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        or drag and drop here
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </label>

          {file && (
            <button
              onClick={() => setFile(null)}
              className="w-full py-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
            >
              Remove file
            </button>
          )}

          <button
            onClick={handleUpload}
            disabled={!file || isUploading}
            className={`
              w-full py-4 rounded-2xl font-semibold text-white 
              transition-all duration-300 transform
              ${!file || isUploading 
                ? 'bg-gray-300 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 hover:scale-[1.02] active:scale-[0.98]'
              }
            `}
          >
            {isUploading ? (
              <div className="flex items-center justify-center space-x-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Uploading...</span>
              </div>
            ) : (
              'Upload Bill'
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Your files are securely encrypted and processed
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadBill;