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
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] p-4">
      {/* Main Card */}
      <div className="w-full max-w-lg bg-[#111827] border border-gray-800 p-8 rounded-2xl shadow-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-200 mb-2">Upload Bill</h2>
          <p className="text-gray-400 text-sm">
            PDF, JPG, PNG — Max 10MB
          </p>
        </div>

        {/* Upload Area */}
        <label className="block w-full">
          <div
            className={`
              border border-gray-700 bg-[#1a1f2b] rounded-xl p-8 text-center cursor-pointer 
              transition-all duration-300
              hover:border-yellow-400 hover:bg-[#222836]
              ${file ? "border-green-500 bg-[#1C2B1F]" : ""}
              ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".pdf,.jpg,.jpeg,.png"
              disabled={isUploading}
            />

            <div className="flex flex-col items-center space-y-4">
              {/* Icon Circle */}
              <div
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center
                  transition-all duration-300
                  ${file ? "bg-green-100/20" : "bg-gray-800"}
                `}
              >
                {file ? (
                  <svg
                    className="w-8 h-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-8 h-8 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                )}
              </div>

              {/* Text */}
              <div>
                {file ? (
                  <>
                    <p className="text-green-400 font-medium break-all">
                      {file.name}
                    </p>
                    <p className="text-green-500 text-sm mt-1">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-gray-300 font-medium">
                      Click to select file
                    </p>
                    <p className="text-gray-500 text-sm mt-1">
                      or drag & drop
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </label>

        {/* Remove File */}
        {file && (
          <button
            onClick={() => setFile(null)}
            className="w-full py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg mt-4 transition"
          >
            Remove File
          </button>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || isUploading}
          className={`
            w-full mt-6 py-4 rounded-xl font-semibold text-gray-900 
            transition-all duration-300
            ${!file || isUploading
              ? "bg-gray-700 text-gray-500 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-300 hover:scale-[1.02] active:scale-[0.97]"
            }
          `}
        >
          {isUploading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-gray-900" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Uploading...</span>
            </div>
          ) : (
            "Upload Bill"
          )}
        </button>

        {/* Safety Text */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Files are processed securely and encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadBill;
