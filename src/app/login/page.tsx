// "use client";
// import React, { useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import Axios from "axios";
// import toast from "react-hot-toast";

// export default function LoginPage() {
//   const router = useRouter();
//   const [user, setUser] = React.useState({
//     email: "",
//     password: "",
//   });

//   const [buttondisabled, setButtonDisabled] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   const onLogin = async () => {
//     try {
//       console.log("Inside Login");
//       setLoading(true); // Start loading state
//       const response = await Axios.post("/api/users/login", user); // Send login request
//       console.log("Login response:", response); // Log the response
//       toast.success("Login successful"); // Show success message
//       router.push("/profile"); // Redirect to home page
//     } catch (error: any) {
//       console.log("Error in login:", error); // Log the error
//       toast.error(error.message); // Show error message
//     } finally {
//       setLoading(false); // Stop loading state
//     }
//   };

//   useEffect(() => {
//     if (user.email.length > 0 && user.password.length > 0) {
//       setButtonDisabled(false);
//     } else {
//       setButtonDisabled(true);
//     }
//   }, [user]);

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2">
//       <h1>{loading ? "Processing..." : "Login"}</h1>
//       <hr />

//       <label htmlFor="email">email: </label>
//       <input
//         className="p-1 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
//         type="text"
//         placeholder="Email"
//         id="email"
//         value={user.email}
//         onChange={(e) => setUser({ ...user, email: e.target.value })}
//       />
//       <label htmlFor="password">password: </label>
//       <input
//         className="p-1 border border-gray-400 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
//         type="text"
//         placeholder="Password"
//         id="password"
//         value={user.password}
//         onChange={(e) => setUser({ ...user, password: e.target.value })}
//       />
//       <button
//         className="p-2 bg-blue-500 text-white rounded-lg"
//         onClick={onLogin}
//       >
//         Login here
//       </button>
//       <Link href="/signup">SignUp page</Link>
//     </div>
//   );
// }
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

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      console.log("Inside Login");
      setLoading(true);
      const response = await Axios.post("/api/users/login", user);
      console.log("Login response:", response);
      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("Error in login:", error);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
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
      <h1 className="text-3xl mb-6">{loading ? "Processing..." : "Login"}</h1>

      <label htmlFor="email">Email:</label>
      <input
        className="p-2 border border-gray-400 rounded-lg mb-4 w-72 focus:outline-none focus:border-gray-600"
        type="text"
        placeholder="Email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />

      <label htmlFor="password">Password:</label>
      <input
        className="p-2 border border-gray-400 rounded-lg mb-4 w-72 focus:outline-none focus:border-gray-600"
        type="password"
        placeholder="Password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />

      <button
        className="p-2 bg-blue-500 text-white rounded-lg w-72 mb-2 disabled:bg-blue-300"
        onClick={onLogin}
        disabled={buttonDisabled || loading}
      >
        Login
      </button>

      <div className="flex flex-col items-center mt-2">
        <Link href="/signup" className="text-blue-500 underline mb-2">
          Don't have an account? Sign up
        </Link>
        <Link
          href="/forgotpassword"
          className="text-sm text-blue-400 underline"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
