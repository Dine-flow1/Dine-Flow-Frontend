"use client";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";

// Components
import FadeInAnimation from "../../components/animations/FadeInAnimation";
import Button from "../../components/ui/Buttons";
import InputField from "../../components/form/InputField";
import FileUploadField from "../../components/form/FileUploadField";
import OtpSection from "../../components/form/OtpSection";
import FormHeader from "../../components/ui/FormHeader";
import Navbar from "@/src/components/ui/Navbar";
import Footer from "@/src/components/ui/Footer";

// Types
interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  profileImage: File | null;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, profileImage: file }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.phone) newErrors.phone = "Phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = () => {
    if (!validateForm()) return;
    setIsOtpSent(true);
    
    gsap.from(".otp-section", {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out"
    });
    
    showAlert("OTP sent to your phone (demo)");
  };

  const handleVerifyOtp = () => {
    setIsVerified(true);
    showAlert("✅ OTP Verified!");
    
    gsap.to(".success-indicator", {
      scale: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 1
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return showAlert("Please verify OTP first");
    
    gsap.to(formRef.current, {
      scale: 1.02,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        showAlert("🎉 Signup Completed!");
      }
    });
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen px-10 py-12 justify-items-center bg-linear-to-br from-blue-50 to-amber-450">
      <div ref={formRef} className="max-w-2xl px-3 mx-auto overflow-hidden bg-white shadow-xl rounded-2xl">
        <div className="p-10 ">
          <FormHeader 
            title="Sign Up" 
            subtitle="Create your account in seconds"
            delay={0.1}
            direction="down"
          />

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
                />
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="Enter your email"
                />
                <InputField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="Enter your phone"
                />
                <InputField
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  placeholder="Create password"
                />
                <InputField
                  label="showConfirmDialog Password"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  placeholder="showConfirmDialog your password"
                />
              </div>
            </FadeInAnimation>

            {isOtpSent && (
              <FadeInAnimation delay={0.4}>
                <div className="otp-section">
                  <OtpSection
                    otp={otp}
                    onOtpChange={setOtp}
                    onVerify={handleVerifyOtp}
                    isVerified={isVerified}
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
                  >
                    Send OTP
                  </Button>
                ) : (
                  <Button
                  type="submit"
                    variant="primary"
                    disabled={!isVerified}
                    className="w-full py-4 text-lg"
                  >
                    Complete Signup
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