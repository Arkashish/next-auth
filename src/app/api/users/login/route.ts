// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// connect();
// export async function POST(request: NextRequest) {
//   try {
//     const reqBody = await request.json();
//     const { email, password } = reqBody;

//     console.log("Request Body:", reqBody);

//     if (!email || !password) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json(
//         { error: "User does not exist" },
//         { status: 400 }
//       );
//     }
//     console.log("User found:", user); // ✅ Log the user object
//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { error: "Invalid credentials" },
//         { status: 400 }
//       );
//     }

//     const tokenData = {
//       _id: user._id,
//       email: user.email,
//       username: user.username,
//     };

//     // Generate JWT token (if needed)
//     const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
//       expiresIn: "1d",
//     });

//     const response = NextResponse.json({
//       message: "Login successful",
//       success: true,
//       user,
//     });

//     response.cookies.set("token", token, {
//       httpOnly: true,
//     });
//     return response;
//   } catch (error: any) {
//     console.log("Error in login:", error); // ✅ Log the full error
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"; // ✅ Import cookies

export async function POST(request: NextRequest) {
  try {
    await connect(); // ✅ Ensure DB connection
    // console.log("Connected to Db");
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // console.log(reqBody);
    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password); // ✅ Ensure correct field
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 400 }
      );
    }

    const tokenData = {
      _id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    // console.log(token);
    // ✅ Correct way to set cookies in Next.js 13+
    (
      await // ✅ Correct way to set cookies in Next.js 13+
      cookies()
    ).set("token", token, { httpOnly: true, secure: true, path: "/" ,maxAge: 24 * 60 * 60});
    // console.log("Login success")
    return NextResponse.json({
      message: "Login successful",
      success: true,
      user,
    });
  } catch (error: any) {
    console.log("Error in login:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
