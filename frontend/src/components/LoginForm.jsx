import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiLogIn } from 'react-icons/fi'; // Feather Icons

export default function LoginForm({ onLoginSuccess, onForgotPassword, onSwitchToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!form.email || !form.password) {
      toast.error("Email and password are required.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!");
      onLoginSuccess(response.data.user);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-md shadow-md max-w-md mt-8 mx-auto border border-gray-200 flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold text-emerald-500 text-center mb-5">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 text-base"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 text-base"
        required
      />

      <button
        type="submit"
        className="w-full bg-emerald-500 text-white py-2 rounded-md font-semibold transition duration-200 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1 flex items-center justify-center"
      >
        <FiLogIn className="inline-block mr-2 align-middle" size={18} /> Log In
      </button>

      
     
    </form>
  );
}