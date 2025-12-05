"use client";

import { useState } from "react";
import { RegistrationProgress } from "@/components/form/RegistrationProgress";
import { EmailVerificationStep } from "@/components/form/steps/EmailVerificationStep";
import { BusinessRegistrationStep } from "@/components/form/steps/BussinessRegistrationSection";
import { OwnerInfoStep } from "@/components/form/steps/OwnerInfoSection";
import { RestaurantInfoStep } from "@/components/form/steps/RestuarantInfoSection";
import { IllustrationSection } from "@/components/form/steps/IllustrationSection";

const steps = [
  { number: 1, title: "Email Verification" },
  { number: 2, title: "Business Registration" },
  { number: 3, title: "Owner Information" },
  { number: 4, title: "Restaurant Details" },
];

export default function RestaurantRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    verificationCode: "",
    panNumber: "",
    gstinNumber: "",
    fssaiNumber: "",
    registrationNumber: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    restaurantName: "",
    restaurantType: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
    openingHours: "",
    deliveryRadius: "",
    logo: "",
    bannerImage: "",
  });

  const updateField = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const apiCall = async (url: string, body: any) => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const sendOtp = async () => {
    const ok = await apiCall("http://localhost:9999/api/restaurants/send-otp", {
      email: formData.email,
      phone: formData.phone,
    });
    if (ok) setOtpSent(true);
  };

  const verifyOtp = async () => {
    const ok = await apiCall(
      "http://localhost:9999/api/restaurants/verify-otp",
      {
        email: formData.email,
        otp: formData.verificationCode,
    
      },
      {}
    );
    if (ok) setCurrentStep(2);
  };

  const completeRegistration = async () => {
    const ok = await apiCall("http://localhost:9999/api/restaurants/register", {
      restaurantData: {
        ...formData,
        deliveryRadius: parseInt(formData.deliveryRadius) || 0,
      },
      ownerData: {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: "restaurant_owner",
      },
    });

    if (ok) {
      alert("🎉 Restaurant registered successfully!");
      window.location.href = "/login";
    } else {
      alert("Registration failed.");
    }
  };

  const renderOtpInputs = () => (
    <div className="flex space-x-3 justify-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          maxLength={1}
          className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          onChange={(e) => {
            const code = formData.verificationCode.split("");
            code[i] = e.target.value;
            setFormData({ ...formData, verificationCode: code.join("") });
          }}
        />
      ))}
    </div>
  );

  const renderOtpScreen = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold">Enter Verification Code</h3>
        <p className="text-gray-600">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      {renderOtpInputs()}

      <button
        className="w-full py-3.5 bg-blue-600 text-white rounded-xl shadow-lg disabled:opacity-50"
        disabled={loading || formData.verificationCode.length < 6}
        onClick={verifyOtp}
      >
        {loading ? "Verifying..." : "Verify & Continue"}
      </button>

      <div className="text-center space-y-3">
        <button className="text-blue-600" onClick={() => setOtpSent(false)}>
          ← Back to email entry
        </button>
        <button className="text-blue-600" onClick={sendOtp}>
          Resend Code
        </button>
      </div>
    </div>
  );

  const renderStepContent = () => {
    if (currentStep === 1)
      return !otpSent ? (
        <EmailVerificationStep
          formData={formData}
          loading={loading}
          onChange={updateField}
          onSendOTP={sendOtp}
        />
      ) : (
        renderOtpScreen()
      );

    if (currentStep === 2)
      return (
        <BusinessRegistrationStep
          formData={formData}
          onChange={updateField}
          onNext={() => setCurrentStep(3)}
          onPrev={() => setCurrentStep(1)}
        />
      );

    if (currentStep === 3)
      return (
        <OwnerInfoStep
          formData={formData}
          onChange={updateField}
          onNext={() => setCurrentStep(4)}
          onPrev={() => setCurrentStep(2)}
        />
      );

    if (currentStep === 4)
      return (
        <RestaurantInfoStep
          formData={formData}
          onChange={updateField}
          onPrev={() => setCurrentStep(3)}
          onSubmit={completeRegistration}
          loading={loading}
        />
      );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <RegistrationProgress currentStep={currentStep} steps={steps} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            <div className="hidden lg:block bg-gradient-to-br from-blue-600 to-indigo-800">
              <IllustrationSection
                currentStep={currentStep}
                otpSent={otpSent}
                email={formData.email}
              />
            </div>

            <div className="p-8 md:p-12">
              <div className="max-w-md mx-auto">{renderStepContent()}</div>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-600 text-sm">
          Already have an account?
          <a href="/login" className="text-blue-600 ml-1">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
