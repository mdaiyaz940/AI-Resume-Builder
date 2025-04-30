// ResetPasswordForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiLock, FiKey } from "react-icons/fi";

export default function ResetPasswordForm({ onBackToLogin }) {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email || !resetCode || !newPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/reset-password`, {
        email,
        token: resetCode,
        password: newPassword,
      });

      toast.success(response.data.message || "Password has been reset!");
      setEmail("");
      setResetCode("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleReset}
      className="bg-white p-6 rounded-2xl shadow-lg max-w-md mt-12 mx-auto border border-gray-200 flex flex-col gap-5"
    >
      <h2 className="text-2xl font-bold text-green-600 text-center mb-3">
        Reset Password
      </h2>

      <p className="text-gray-600 text-center text-sm mb-2">
        Enter your email, the reset code sent to you, and your new password.
      </p>

      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500 text-base transition-all"
      />

      <input
        type="text"
        placeholder="Reset Code"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500 text-base transition-all"
      />

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-green-500 text-base transition-all"
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md font-medium transition duration-200 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 flex items-center justify-center"
        disabled={loading}
      >
        {loading ? (
          "Resetting..."
        ) : (
          <>
            <FiLock className="inline-block mr-2" size={18} />
            Reset Password
          </>
        )}
      </button>

      <div className="text-center mt-3">
        <button
          type="button"
          onClick={onBackToLogin}
          className="text-sm text-gray-500 hover:underline hover:text-green-600 transition"
        >
          Back to Login
        </button>
      </div>
    </form>
  );
}
