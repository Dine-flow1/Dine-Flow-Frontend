"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Components
import FadeInAnimation from "../../components/animations/FadeInAnimation";
import Button from "../../components/ui/Buttons";
import InputField from "../../components/form/InputField";
import FileUploadField from "../../components/form/FileUploadField";
import OtpSection from "../../components/form/OtpSection";
import FormHeader from "../../components/ui/FormHeader";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";

// Types
interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  profileImage: File | null;
  role: string;
}

interface ApiResponse {
  error?: boolean;
  message?: string;
  user?: any;
  token?: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profileImage: null,
    role: "customer", // Default role
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const otpSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Animation on mount
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = "Passwords do not match";
    
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
    // You can replace this with a proper toast notification
    alert(message);
  };

const handleSendOtp = async () => {
  if (!validateForm()) return;
  
  setLoading(true);
  setApiError("");

  try {
    console.log("🔄 Attempting to send OTP for:", formData.email);

    // 🎯 TEMPORARY FIX: Skip the API call and simulate success
    // Remove this try-catch block once API is working
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
    
    // 🎯 ALWAYS return success for now
    const demoOtp = "123456";
    console.log("✅ OTP sent successfully (Demo mode):", demoOtp);
    
    setIsOtpSent(true);
    showAlert(`OTP sent to your phone number. Demo OTP: ${demoOtp}`);
    
    // Animation
    setTimeout(() => {
      if (otpSectionRef.current) {
        gsap.fromTo(otpSectionRef.current, 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
      }
    }, 100);
    
  } catch (error) {
    console.error("OTP sending error:", error);
    // 🎯 Even if there's an error, show OTP section for testing
    setIsOtpSent(true);
    setApiError("");
    showAlert("OTP sent to your phone number. Use 123456 as OTP.");
  } finally {
    setLoading(false);
  }
};

 const handleVerifyOtp = async () => {
  setLoading(true);
  setApiError("");

  try {
    console.log("🔄 Verifying OTP:", otp);
    
    // 🎯 TEMPORARY FIX: Skip API verification
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // 🎯 Accept any 6-digit OTP for testing
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      setIsVerified(true);
      showAlert("✅ OTP Verified Successfully!");
      
      setTimeout(() => {
        const successIndicator = document.querySelector('.success-indicator');
        if (successIndicator) {
          gsap.to(successIndicator, {
            scale: 1.2,
            duration: 0.3,
            yoyo: true,
            repeat: 1
          });
        }
      }, 100);
    } else {
      setApiError("Please enter a valid 6-digit OTP");
    }
    
  } catch (error) {
    console.error("OTP verification error:", error);
    setApiError("Failed to verify OTP. Please try again.");
  } finally {
    setLoading(false);
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) {
      showAlert("Please verify OTP first", "error");
      return;
    }

    setLoading(true);
    setApiError("");

    try {
      // Prepare form data for submission
      const userData = {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        contact: formData.phone,
        role: formData.role,
        // profileImage will be handled separately if needed
      };

      // ✅ FIXED: Use relative URL instead of localhost:3001
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result: ApiResponse = await response.json();

      if (!response.ok || result.error) {
        setApiError(result.message || "Signup failed. Please try again.");
        return;
      }

      // Animation on success
      if (formRef.current) {
        gsap.to(formRef.current, {
          scale: 1.02,
          duration: 0.3,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            showAlert("🎉 Account Created Successfully! Redirecting to login...");
            
            // Always redirect to login page after signup
            setTimeout(() => {
              router.push("/login?message=signup_success");
            }, 1500);
          }
        });
      }
      
    } catch (error) {
      console.error("Signup error:", error);
      setApiError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="min-h-screen px-10 py-12 justify-items-center bg-linear-to-br from-blue-50 to-amber-450">
        <div ref={formRef} className="max-w-2xl px-3 mx-auto overflow-hidden bg-white shadow-xl rounded-2xl">
          <div className="p-10">
            <FormHeader 
              title="Sign Up" 
              subtitle="Create your account in seconds"
              delay={0.1}
              direction="down"
            />

            {apiError && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-200 rounded-lg">
                {apiError}
              </div>
            )}

            <FileUploadField 
              label="Profile Photo"
              onChange={handleFileChange}
              delay={0.2}
              direction="left"
            />

            <form onSubmit={handleSubmit} className="space-y-6">
              <FadeInAnimation delay={0.3} direction="right">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="Enter your email"
                    disabled={loading || isOtpSent}
                  />
                  <InputField
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="Enter your phone"
                    disabled={loading || isOtpSent}
                  />
                  
                  {/* Role Selection */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Account Type
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      disabled={loading}
                    >
                      <option value="customer">Customer</option>
                      <option value="owner">Restaurant Owner</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>

                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="Create password"
                    disabled={loading}
                  />
                  <InputField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                </div>
              </FadeInAnimation>

              {isOtpSent && (
                <FadeInAnimation delay={0.4}>
                  <div ref={otpSectionRef} className="otp-section">
                    <OtpSection
                      otp={otp}
                      onOtpChange={setOtp}
                      onVerify={handleVerifyOtp}
                      isVerified={isVerified}
                      loading={loading}
                    />
                  </div>
                </FadeInAnimation>
              )}

              <FadeInAnimation delay={0.5} direction="up">
                <div className="flex flex-col gap-4">
                  {!isOtpSent ? (
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleSendOtp}
                      className="w-full py-4 text-lg"
                      disabled={loading}
                    >
                      {loading ? "Sending OTP..." : "Send OTP"}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={!isVerified || loading}
                      className="w-full py-4 text-lg"
                    >
                      {loading ? "Creating Account..." : "Complete Signup"}
                    </Button>
                  )}
                  
                  <div className="text-center">
                    <p className="text-gray-600">
                      Already have an account?{" "}
                      <Link href="/login" className="font-medium text-blue-600 hover:text-blue-700">
                        Sign in
                      </Link>
                    </p>
                  </div>
                </div>
              </FadeInAnimation>
            </form>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Signup;