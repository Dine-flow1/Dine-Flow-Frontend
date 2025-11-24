import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  contact: string;
  role?: string;
}

// Function to determine role based on email
function determineRole(email: string, fullName?: string): string {
  const emailLower = email.toLowerCase();
  
  if (emailLower === 'admin@dineflow.com' || emailLower.includes('+admin') || fullName?.toLowerCase().includes('admin')) {
    return 'admin';
  }
  
  if (emailLower === 'restaurantowner@gmail.com' || 
      emailLower.includes('restaurantowner') || 
      emailLower.includes('+owner') ||
      fullName?.toLowerCase().includes('owner')) {
    return 'owner';
  }
  
  if (emailLower === 'manager@dineflow.com' || 
      emailLower.includes('manager') || 
      emailLower.includes('+manager') ||
      fullName?.toLowerCase().includes('manager')) {
    return 'manager';
  }
  
  return 'customer';
}

export async function POST(request: NextRequest) {
  try {
    const { fullName, email, password, contact, role }: SignupRequest = await request.json();

    // Validate input
    if (!fullName || !email || !password || !contact) {
      return NextResponse.json(
        { error: true, message: "All fields are required" },
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

    // Check if user already exists by reading from your database
    // In a real app, you would query your database here
    const existingUsers = [
      "john@example.com",
      "restaurantowner@gmail.com",
      "manager@dineflow.com",
      "admin@dineflow.com"
    ];
    
    if (existingUsers.includes(email.toLowerCase())) {
      return NextResponse.json(
        { error: true, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Determine final role
    const finalRole = role || determineRole(email, fullName);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user object matching your exact database schema
    const newUser = {
      _id: `user_${Date.now()}`,
      fullName,
      email,
      password: hashedPassword,
      googleId: null,
      role: finalRole,
      contact,
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
      isAccountVerified: true, // Set to true after OTP verification
      verifyOtp: null,
      verifyOtpExpireAt: null,
      resetOtp: null,
      resetOtpExpireAt: null
    };

    // In a real application, you would save to your database here
    console.log('USER CREATED - Add this to your db.json users array:');
    console.log(JSON.stringify(newUser, null, 2));

    // Generate simple token (in real app, use JWT)
    const token = `demo-token-${Date.now()}`;

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json({
      user: userWithoutPassword,
      token,
      message: "Account created successfully"
    }, { status: 201 });

  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}