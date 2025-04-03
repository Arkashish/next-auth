"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful"); // Show success message
      router.push("/login"); // Redirect to login page
    } catch (error: any) {
      console.error("Error during logout:", error.message);
      toast.error(error.message); // Show error message
    }
  };

  const [data, setData] = useState("nothing");

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2>
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}></Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="p-2 bg-blue-500 text-white rounded-lg mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="p-2 bg-purple-500 text-white rounded-lg mb-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        Get User Details
      </button>
    </div>
  );
}
