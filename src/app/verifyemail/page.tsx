"use client";

import axios from "axios";
import { set } from "mongoose";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage(props: any) {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.error("Error verifying email:", error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-300 text-black">
        {token ? `${token}` : "no token"}
      </h2>

      {verified && (
        <div className="p-4 bg-green-300 text-black">
          <h2>Email verified successfully!</h2>
          <Link href="/login" className="text-blue-500">
            Go to Login
          </Link>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-300 text-black">
          <h2>Invalid or expired token</h2>
          <Link href="/signup" className="text-blue-500">
            Go to Register
          </Link>
        </div>
      )}

      <hr />
      <p>Please check your email for verification link.</p>
      <p>If you don't see it, please check your spam folder.</p>
    </div>
  );
}
