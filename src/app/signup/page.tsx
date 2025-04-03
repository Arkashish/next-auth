"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = React.useState("");

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("SignUp Success", response.data);
      router.push("/login");
    } catch (error: any) {
      // console.log(error);
      // setError(error.response.data.error);
      // setLoading(false);
      console.log("SignUp Failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Signup"}</h1>
      <hr />
      <label htmlFor="username">username: </label>
      <input
        className="p-1 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        placeholder="Username"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <label htmlFor="email">email: </label>
      <input
        className="p-1 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        placeholder="Email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password: </label>
      <input
        className="p-1 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        type="text"
        placeholder="Password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="p-2 bg-blue-500 text-white rounded-lg"
        onClick={onSignup}
      >
        {/* Submit */}
        {buttonDisabled ? "No Signup" : "SignUp"}
      </button>
      <Link href="/login">Login</Link>
    </div>
  );
}
