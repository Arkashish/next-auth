"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttondisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      console.log("Inside Login");
      setLoading(true); // Start loading state
      const response = await Axios.post("/api/users/login", user); // Send login request
      console.log("Login response:", response); // Log the response
      toast.success("Login successful"); // Show success message
      router.push("/profile"); // Redirect to home page
    } catch (error: any) {
      console.log("Error in login:", error); // Log the error
      toast.error(error.message); // Show error message
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Login"}</h1>
      <hr />

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
        onClick={onLogin}
      >
        Login here
      </button>
      <Link href="/signup">SignUp page</Link>
    </div>
  );
}
