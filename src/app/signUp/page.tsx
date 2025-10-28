"use client";
import React, { useState } from "react";
import InputField from "./../../components/form/InputField";
import Button from "./../../components/Buttons";
import { FormSection } from "./../../components/form/FormSection";
import { FileUploadField } from "./../../components/form/FileUploadField";
import PhoneInputWithCountryCode from "./../../components/form/PhoneInputWithCountryCode";
import OtpSection from "./../../components/form/OtpSection";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  countryCode: string;
  profileImage: File | null;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    countryCode: "",
    profileImage: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  // ---------------- Functions ----------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) =>
    setFormData((prev) => ({ ...prev, profileImage: file }));

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.countryCode) newErrors.countryCode = "Select code";
    if (!formData.profileImage)
      newErrors.profileImage = "Profile image required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = () => {
    if (!validateForm()) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setIsOtpSent(true);
    alert(
      `📩 OTP sent to ${formData.countryCode} ${formData.phone}: ${code} (demo)`
    );
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setIsVerified(true);
      alert("✅ OTP Verified! You can now sign up.");
    } else alert("❌ Incorrect OTP. Try again.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isVerified) return alert("⚠️ Verify OTP before signing up.");
    console.log("Signup Successful:", formData);
    alert("🎉 Signup Completed!");
  };

  // ---------------- UI ----------------
  return (
    <div className="max-w-2xl p-6 mx-auto mt-10 bg-white shadow-lg rounded-xl">
      <h2 className="mb-6 font-serif text-3xl font-bold text-center text-gray-900">
        Create an Account
      </h2>

      <FileUploadField
        label="Profile Photo"
        onChange={handleFileChange}
        showPreview
        previewShape="circle"
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        <FormSection title="Personal Information">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <PhoneInputWithCountryCode
              {...({ phone: formData.phone, countryCode: formData.countryCode, onChange: handleChange, error: errors.phone } as any)}
            />
          </div>
          {isOtpSent && (
            <OtpSection
              otp={otp}
              onOtpChange={setOtp}
              onVerify={handleVerifyOtp}
            />
          )}
        </FormSection>

        <FormSection title="Security">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <InputField
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>
        </FormSection>

        <div className="text-center">
          {!isOtpSent ? (
            <Button
              type="button"
              variant="primary"
              className="px-8 py-3"
              onClick={handleSendOtp}
            >
              Send OTP
            </Button>
          ) : (
            <Button type="submit" variant="primary" className="px-8 py-3">
              Sign Up
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Signup;
