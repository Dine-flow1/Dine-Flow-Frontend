import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Mock database matching your schema - replace with actual database queries
const users = [
  {
    _id: "user_1",
    fullName: "John Doe",
    email: "john@example.com",
    password: "$2a$12$KcT7O8VQ8Q8Q8Q8Q8Q8Q8u", // hashed "password123"
    googleId: null,
    role: "customer",
    contact: "9876543210",
    profileImage: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      location: {
        type: "Point",
        coordinates: [0, 0]
      }
    },
    isAccountVerified: true,
    verifyOtp: null,
    verifyOtpExpireAt: null,
    resetOtp: null,
    resetOtpExpireAt: null
  },
  {
    _id: "user_owner_1",
    fullName: "Restaurant Owner",
    email: "restaurantowner@gmail.com",
    password: "$2a$12$KcT7O8VQ8Q8Q8Q8Q8Q8Q8u", // hashed "rest1234"
    googleId: null,
    role: "owner",
    contact: "9876543210",
    profileImage: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      location: {
        type: "Point",
        coordinates: [0, 0]
      }
    },
    isAccountVerified: true,
    verifyOtp: null,
    verifyOtpExpireAt: null,
    resetOtp: null,
    resetOtpExpireAt: null
  },
  {
    _id: "user_manager_1",
    fullName: "Restaurant Manager",
    email: "manager@dineflow.com",
    password: "$2a$12$KcT7O8VQ8Q8Q8Q8Q8Q8Q8u", // hashed "manager1234"
    googleId: null,
    role: "manager",
    contact: "9876543212",
    profileImage: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      location: {
        type: "Point",
        coordinates: [0, 0]
      }
    },
    isAccountVerified: true,
    verifyOtp: null,
    verifyOtpExpireAt: null,
    resetOtp: null,
    resetOtpExpireAt: null
  },
  {
    _id: "user_admin_1",
    fullName: "System Admin",
    email: "admin@dineflow.com",
    password: "$2a$12$KcT7O8VQ8Q8Q8Q8Q8Q8Q8u", // hashed "admin1234"
    googleId: null,
    role: "admin",
    contact: "9876543200",
    profileImage: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
      location: {
        type: "Point",
        coordinates: [0, 0]
      }
    },
    isAccountVerified: true,
    verifyOtp: null,
    verifyOtpExpireAt: null,
    resetOtp: null,
    resetOtpExpireAt: null
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: true, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return NextResponse.json(
        { error: true, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password (in real app, use bcrypt.compare)
    // For demo, we'll use simple password matching
    const demoPasswords = {
      "john@example.com": "password123",
      "restaurantowner@gmail.com": "rest1234",
      "manager@dineflow.com": "manager1234",
      "admin@dineflow.com": "admin1234"
    };

    const isValidPassword = demoPasswords[email as keyof typeof demoPasswords] === password;

    if (!isValidPassword) {
      return NextResponse.json(
        { error: true, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if account is verified
    if (!user.isAccountVerified) {
      return NextResponse.json(
        { error: true, message: "Please verify your email address first" },
        { status: 401 }
      );
    }

    // Generate token
    const token = `demo-token-${Date.now()}`;

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    
    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: "Login successful"
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}