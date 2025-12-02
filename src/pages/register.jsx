import React, { useState } from 'react';
import axiosInstance from '../utlis/axiosinstance';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    address: "",
    contact: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, shopName, address, contact } = formData;

    // Basic validation
    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !shopName.trim() ||
      !address.trim() ||
      !contact.trim()
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (contact.length !== 10) {
      toast.error("Contact number must be 10 digits");
      return;
    }

    setLoading(true);

    try {
      // Save for OTP verify step
      localStorage.setItem("pendingUser", JSON.stringify(formData));

      // Send OTP
      await axiosInstance.post("/auth/signup/pre-register", formData);

      toast.success("OTP sent to your email 📩");

      // Navigate to OTP verify page
      navigate(`/register/verify?email=${email}`);

    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.log("REG ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-[#050b14] flex items-center justify-center p-4 text-white">
    <div className="w-full max-w-lg bg-[#0b1220] p-8 rounded-2xl shadow-2xl">

      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-3xl text-black">📝</span>
        </div>
        <h2 className="text-2xl font-semibold">Create Account</h2>
        <p className="text-gray-400 mt-1">Verify with OTP sent to your email</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-[#0f172a] rounded-xl outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-300">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              className="w-full mt-1 p-3 bg-[#0f172a] rounded-xl outline-none"
              placeholder="Your shop"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-3 bg-[#0f172a] rounded-xl outline-none"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mt-1 p-3 bg-[#0f172a] rounded-xl outline-none"
            placeholder="•••••••"
            minLength={6}
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full mt-1 p-3 bg-[#0f172a] rounded-xl outline-none"
            placeholder="Shop address"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Contact Number</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            maxLength={10}
            className="w-full mt-1 p-3 bg-[#0f172a] rounded-xl outline-none"
            placeholder="10-digit number"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-yellow-400 text-black rounded-xl font-semibold mt-4 disabled:opacity-50"
        >
          {loading ? "Sending OTP..." : "Create Account"}
        </button>
      </form>

      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        <p className="text-gray-400">Already registered?</p>
        <Link
          to="/login"
          className="text-yellow-400 font-semibold hover:text-yellow-300"
        >
          Login →
        </Link>
      </div>

    </div>
  </div>
);

};

export default Register;
