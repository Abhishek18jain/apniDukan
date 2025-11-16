import React from 'react'
import axiosInstance from '../utlis/axiosinstance';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    shopName: "",
    address : "",
    contact :"",
  });
  const [loading, setLoading] = useState(false);
 const handleChange = (e) =>{
    setFormData ({...formData , [e.target.name] : e.target.value})
 }
const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true)

try {
    console.log("api hit")
    await axiosInstance.post("/auth/register", formData);
    toast.success("Registration successful 🎉");
 const res= await axiosInstance.post("/auth/login", formData);
          localStorage.setItem("token", res.data.token);
          navigate("/");
} catch (error) {
     toast.error(error.response?.data?.message || "Registration failed");
      console.log(error)
}
finally {
      setLoading(false);
    }
}
  return (
    <div>
<h2>create Account</h2>

<form onSubmit={handleSubmit}>

             <div> 
                <label className="block text-sm font-medium">Name</label>
                <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"           />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Shop Name</label>
            <input
              type="text"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>
             <div>
            <label className="block text-sm font-medium">address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
  <label className="block text-sm font-medium">Contact</label>
  <input
    type="text"
    name="contact"
    value={formData.contact}
    onChange={handleChange}
    required
    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
  />
</div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
         
    </div>
  )
}

export default Register