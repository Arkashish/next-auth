import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();
export async function POST(request: NextRequest) {
  try {
    
    const reqBody = await request.json();
    const { email, password, username } = reqBody;

    console.log("Request Body:", reqBody);

    if (!email || !password || !username) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      email,
      password: hashedPassword, // ✅ Fix field name
      username,
    });

    console.log("User created, saving to database...");
    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser);

    // Send verification email (optional)
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });
    // console.log("Verification email sent");

    // Send response
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: savedUser,
    });
  } catch (error: any) {
    console.log("Error in signup:", error); // ✅ Log the full error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
