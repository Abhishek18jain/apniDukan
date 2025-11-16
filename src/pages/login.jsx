import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axiosInstance from "../utlis/axiosinstance"
import { Link } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
   const [formData , setFormData] = useState ({email:"" , password :""});
   const [loading , setLoading] =  useState(false);
const handleChange = (e) =>{
    setFormData ({...formData, [e.target.name]: e.target.value});
} 
const handleSubmit = async (e) =>{
    e.preventDefault();
    setLoading(true);

try {
    const res = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful 🎉");
      navigate("/");
} catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
    console.log(error)
}
finally{
setLoading(false)}
}
  return (
    <div>
<h2>Login to your shop</h2>
<form  onSubmit={handleSubmit}>
 <div>
    <label> Email</label>
    <input type="text" name='email' value={formData.email}
    onChange={handleChange} placeholder='Enter Your Email' required  />
 </div>
 <div>
     <label> Password</label>
    <input type="password" name='password' value={formData.password}
    onChange={handleChange} placeholder='Enter Your Password' required  />
 </div>
<button type='submit' disabled = {loading} > {loading ? "loggin in..." :"login"} 
</button>
</form>
<p>don't have account?</p>
<Link to = "/register">Register</Link>
    </div>
  )
}
export default Login