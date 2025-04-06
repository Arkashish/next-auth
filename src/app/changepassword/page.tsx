"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ChangePasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const changePassword = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/changepassword", {
        token,
        password,
      });
      console.log("Password changed:", response.data);
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.error("Error changing password:", error.response?.data);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl mb-4">Change Password</h1>

      <input
        className="p-2 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="p-2 bg-blue-500 text-white rounded-lg mb-4"
        onClick={changePassword}
        disabled={loading || !password}
      >
        {loading ? "Changing..." : "Change Password"}
      </button>

      {verified && (
        <div className="p-4 bg-green-300 text-black rounded-lg">
          <h2>Password changed successfully!</h2>
          <Link href="/login" className="text-blue-500 underline">
            Go to Login
          </Link>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-300 text-black rounded-lg">
          <h2>Invalid or expired token</h2>
          <Link href="/signup" className="text-blue-500 underline">
            Go to Register
          </Link>
        </div>
      )}
    </div>
  );
}
