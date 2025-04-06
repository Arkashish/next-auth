"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/forgotpassword", { email });
      toast.success(response.data.message || "Reset email sent!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Forgot Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="p-2 border border-gray-300 rounded-md mb-4 w-full max-w-sm"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleForgotPassword}
        disabled={loading || !email}
        className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <h2>Invalid or expired token</h2>
      <Link href="/login" className="text-blue-500">
        Go to Login
      </Link>
    </div>
  );
};

export default ForgotPasswordPage;
