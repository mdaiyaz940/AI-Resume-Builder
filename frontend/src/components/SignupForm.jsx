import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUserPlus, FiMail, FiLock, FiUser } from "react-icons/fi";

export default function SignupForm({ onSignupSuccess }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, form);
      localStorage.setItem("token", response.data.token);
      toast.success("Signup successful!");
      onSignupSuccess(response.data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow-lg max-w-md mt-10 mx-auto flex flex-col gap-6 border border-gray-100 transition-all duration-300"
    >
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-emerald-600">Create Account</h2>
        <p className="text-gray-500 text-sm mt-1">Join and build your resume with AI</p>
      </div>

      {/* Full Name Field */}
      <div className="relative">
        <FiUser className="absolute left-3 top-3.5 text-gray-400" size={20} />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 text-base"
          required
        />
      </div>

      {/* Email Field */}
      <div className="relative">
        <FiMail className="absolute left-3 top-3.5 text-gray-400" size={20} />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 text-base"
          required
        />
      </div>

      {/* Password Field */}
      <div className="relative">
        <FiLock className="absolute left-3 top-3.5 text-gray-400" size={20} />
        <input
          type="password"
          name="password"
          placeholder="Password (min 6 characters)"
          value={form.password}
          onChange={handleChange}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 text-base"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-md font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 flex items-center justify-center shadow-md"
      >
        <FiUserPlus className="mr-2" size={18} />
        Sign Up
      </button>
    </form>
  );
}
