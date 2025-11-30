import React, { useState, useEffect } from "react";
import axiosInstance from "../utlis/axiosinstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupVerifyOtp = () => {
  const navigate = useNavigate();

  const email = new URLSearchParams(window.location.search).get("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  // Load stored user data from local storage
  useEffect(() => {
    const saved = localStorage.getItem("pendingUser");

    if (!saved) {
      toast.error("Session expired. Please register again.");
      navigate("/register");
      return;
    }

    setUserData(JSON.parse(saved));
  }, []);

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error("Enter OTP");
      return;
    }

    if (!userData) {
      toast.error("Session expired. Please register again.");
      navigate("/register");
      return;
    }

    setLoading(true);

    try {
      // Payload: must match backend signature
      const payload = {
        email,
        otp,
        name: userData.name,
        password: userData.password,
        contact: userData.contact,
        address: userData.address,
        shopName: userData.shopName,
      };

      // 1. Verify OTP + Create account
      await axiosInstance.post("/auth/signup/verify-otp", payload);

      toast.success("Account created successfully 🎉");

      // 2. Auto-login
      const loginRes = await axiosInstance.post("/auth/login", {
        email: userData.email,
        password: userData.password,
      });

      // Store token
      localStorage.setItem("token", loginRes.data.token);

      // Clean temp data
      localStorage.removeItem("pendingUser");

      navigate("/");

    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
      console.log("VERIFY ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-xl transition duration-300">

          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl text-white">🔐</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Verify OTP</h2>
            <p className="text-gray-600">
              OTP sent to <span className="font-semibold text-blue-600">{email}</span>
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">

            <div className="transform transition-all duration-300 hover:scale-105">
              <label className="block text-sm font-medium text-gray-700 mb-2">🔢 Enter OTP</label>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="6 digit OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition duration-300 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Create Account"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default SignupVerifyOtp;
