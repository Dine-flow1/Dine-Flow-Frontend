import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: true, message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // For demo, accept any 6-digit OTP
    const isValidOTP = /^\d{6}$/.test(otp);

    if (!isValidOTP) {
      return NextResponse.json(
        { error: true, message: "Invalid OTP. Please enter a 6-digit code." },
        { status: 400 }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({
      error: false,
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}