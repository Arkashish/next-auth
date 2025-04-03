import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";



export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPathPublic = path === "/login" || path === "/signup";

  // Retrieve token from cookies
  const token = request.cookies.get("token")?.value || "";

  if (isPathPublic && token) {
    // If logged in, prevent access to login/signup pages
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPathPublic && !token) {
    // If not logged in, block access to protected routes
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
  return NextResponse.next();
}

// Apply middleware to relevant routes
export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};

// import { jwtVerify } from "jose"; // ✅ Use jose instead of jsonwebtoken

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname;
//   const isPathPublic = path === "/login" || path === "/signup";

//   const token = request.cookies.get("token")?.value;

//   console.log("Middleware Log - Path:", path);
//   console.log("Middleware Log - Token:", token);

//   // If the path is public and the user has a token, redirect them away
//   if (isPathPublic && token) {
//     console.log("Redirecting logged-in user away from login/signup");
//     return NextResponse.redirect(new URL("/", request.nextUrl));
//   }

//   // If the route is protected, verify the token
//   if (!isPathPublic) {
//     if (!token) {
//       console.log("Redirecting unauthorized user to login (No token found)");
//       return NextResponse.redirect(new URL("/login", request.nextUrl));
//     }

//     try {
//       const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
//       const { payload } = await jwtVerify(token, secret); // ✅ Verify JWT using jose
//       console.log("Token verified successfully:", payload);
//     } catch (error) {
//       console.log("Invalid or expired token:", error);
//       return NextResponse.redirect(new URL("/login", request.nextUrl));
//     }
//   }

//   return NextResponse.next();
// }

// Apply middleware to relevant routes
// export const config = {
//   matcher: ["/profile", "/"],
// };


