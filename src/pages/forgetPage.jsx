import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utlis/axiosinstance";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/auth/forget/send-otp", { email });
      toast.success("OTP sent to your email 📩");

      navigate(`/reset-password?email=${email}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-2xl transition-all duration-300">

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transform transition">
              <span className="text-3xl text-white">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password?</h2>
            <p className="text-gray-600">Enter your email to receive the OTP</p>
          </div>

          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="hover:scale-105 transform transition">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                📧 Enter Email
              </label>
              <input
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold 
              shadow-lg hover:bg-purple-700 hover:shadow-xl transform hover:scale-105 
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
