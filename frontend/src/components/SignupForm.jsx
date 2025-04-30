import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUserPlus } from 'react-icons/fi'; // Feather Icons

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
      className="bg-white p-8 rounded-md shadow-md max-w-md mt-10 mx-auto flex flex-col gap-6 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-emerald-500 text-center mb-4">Create an Account</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 text-base"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 text-base"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-emerald-500 text-base"
        required
      />

      <button
        type="submit"
        className="w-full bg-emerald-500 text-white py-3 rounded-md font-semibold transition duration-200 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-1 flex items-center justify-center"
      >
        <FiUserPlus className="inline-block mr-2 align-middle" size={18} />
        Sign Up
      </button>
    </form>
  );
}