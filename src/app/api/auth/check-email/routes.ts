import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: true, message: "Email is required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: true, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Mock database check
    const existingUsers = [
      "restaurantowner@gmail.com",
      "manager@dineflow.com", 
      "admin@dineflow.com",
      "john@example.com"
    ];

    // Check if email already exists
    if (existingUsers.includes(email.toLowerCase())) {
      return NextResponse.json(
        { error: true, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    console.log(`OTP for ${email}: ${otp}`);

    // Simulate OTP sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      error: false,
      message: "OTP sent successfully",
      demoOtp: otp
    });

  } catch (error) {
    console.error("Check email error:", error);
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: "Check Email API is working!",
    status: "active"
  });
}