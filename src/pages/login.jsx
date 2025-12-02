import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axiosInstance from "../utlis/axiosinstance"
import { Link } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful 🎉");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }
return (
  <div className="min-h-screen bg-[#050b14] flex items-center justify-center p-4 text-white">
    <div className="w-full max-w-md bg-[#0b1220] p-8 rounded-2xl shadow-2xl">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl text-black">🏪</span>
        </div>
        <h2 className="text-2xl font-semibold">Welcome Back</h2>
        <p className="text-gray-400 mt-1">Login to your shop account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full mt-1 p-3 bg-[#0f172a] rounded-xl outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full mt-1 p-3 bg-[#0f172a] rounded-xl outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-yellow-400 text-black rounded-xl font-semibold shadow-md 
          disabled:opacity-50 mt-2"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Forgot Password */}
      <div className="text-center mt-4">
        <Link
          to="/forgot-password"
          className="text-sm text-yellow-400 hover:text-yellow-300 font-medium"
        >
          Forgot password?
        </Link>
      </div>

      {/* Footer */}
      <div className="text-center mt-6 pt-6 border-t border-gray-700">
        <p className="text-gray-400">Don't have an account?</p>
        <Link
          to="/register"
          className="inline-block mt-2 text-yellow-400 font-semibold hover:text-yellow-300"
        >
          Create New Account →
        </Link>
      </div>

    </div>
  </div>
);

}

export default Login