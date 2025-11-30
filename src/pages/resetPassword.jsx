import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utlis/axiosinstance";

const ResetPassword = () => {
  const navigate = useNavigate();
  const email = new URLSearchParams(window.location.search).get("email");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/auth/forget/password", {
        email,
        otp,
        newPassword,
      });

      toast.success("Password reset successful 🎉");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-2xl transition-all duration-300">
          
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 hover:scale-110 transform transition">
              <span className="text-3xl text-white">🔑</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h2>
            <p className="text-gray-600">Enter OTP & your new password</p>
          </div>

          <form onSubmit={handleReset} className="space-y-6">

            <div className="hover:scale-105 transform transition">
              <label className="block text-sm font-medium text-gray-700 mb-2">🔢 OTP</label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div className="hover:scale-105 transform transition">
              <label className="block text-sm font-medium text-gray-700 mb-2">🔒 New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold 
              shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:scale-105 
              transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
