"use client";

import React from "react";

interface IllustrationSectionProps {
  currentStep: number;
  otpSent: boolean;
  email: string;
}

export const IllustrationSection: React.FC<IllustrationSectionProps> = ({
  currentStep,
  otpSent,
  email,
}) => {
  if (currentStep === 1 && !otpSent) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-white">
        <div className="w-48 h-48 mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <path
              fill="rgba(255,255,255,0.1)"
              d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,89.8,-0.1C89.7,16.2,86.8,32.4,79.5,45.4C72.2,58.4,60.6,68.2,46.9,75.1C33.1,82,16.6,86,0.7,84.8C-15.2,83.7,-30.3,77.4,-43.2,68.9C-56,60.4,-66.5,49.7,-75.5,37.1C-84.5,24.5,-92,10.2,-91.8,-4.3C-91.7,-18.8,-83.8,-37.6,-71.5,-51.8C-59.2,-66,-42.6,-75.7,-25.8,-81.2C-8.9,-86.7,8.9,-88,24.3,-83.6C39.7,-79.2,52.8,-69.2,58.8,-57.3C64.8,-45.4,63.7,-31.6,66,-19C68.3,-6.3,73.9,5.2,74.3,16.9C74.6,28.6,69.7,40.6,61.4,51.3C53.1,62,41.4,71.5,28.9,78.1C16.3,84.7,3.1,88.4,-9.3,87.4C-21.8,86.4,-37.3,80.6,-49.7,71.3C-62.1,62,-71.4,49.2,-77.7,35.1C-84,21,-87.4,5.6,-84.9,-8.8C-82.4,-23.3,-74.1,-36.7,-63,-48.6C-51.8,-60.5,-37.9,-70.8,-23.3,-77.9C-8.7,-85,6.5,-88.8,19.2,-84.7C31.9,-80.6,42,-68.6,44.7,-55.8C47.4,-42.9,42.7,-29.3,43.1,-16.5C43.6,-3.7,49.2,8.3,51.5,20.9C53.7,33.4,52.5,46.5,46.5,57.8C40.5,69.1,29.6,78.6,16.9,84.2C4.3,89.8,-10.1,91.5,-22.9,87.9C-35.8,84.3,-47.1,75.4,-56.3,64.3C-65.5,53.2,-72.7,39.8,-78.4,25.6C-84.2,11.4,-88.6,-3.5,-87.9,-18.3C-87.1,-33.2,-81.3,-47.9,-71.4,-59.8C-61.5,-71.8,-47.6,-81,-32.6,-87.1C-17.6,-93.2,-1.5,-96.3,12.7,-92.8C26.9,-89.3,41.1,-79.1,44.7,-67.6C48.3,-56.1,41.3,-43.3,44.7,-31.9C48.1,-20.6,61.9,-10.3,66.6,2C71.3,14.4,66.9,28.7,59.8,41.1C52.7,53.5,42.9,64,31.7,72.7C20.4,81.3,7.7,88.2,-5.3,91C-18.3,93.8,-36.6,92.6,-51.1,85.5C-65.7,78.4,-76.5,65.4,-83.2,50.4C-90,35.4,-92.7,18.4,-91.6,1.6C-90.5,-15.2,-85.6,-30.4,-77.3,-43.9C-68.9,-57.4,-57,-69.3,-43.3,-77.5C-29.6,-85.8,-14.1,-90.5,0.7,-90.3C15.4,-90.2,30.8,-85.1,44.7,-76.4Z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">
          Welcome to DineFlow Restaurants
        </h2>
        <p className="text-lg text-blue-100 text-center mb-8 max-w-md">
          Join thousands of successful restaurants growing their business with
          our platform
        </p>
        <div className="space-y-4 text-left max-w-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-white">Secure verification process</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-white">Easy multi-step registration</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-white">Start in minutes</span>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 1 && otpSent) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-white">
        <div className="w-48 h-48 mb-8 relative">
          <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
          <div className="absolute inset-4 bg-white/10 rounded-full animate-ping animation-delay-1000"></div>
          <div className="absolute inset-8 bg-white/10 rounded-full animate-ping animation-delay-2000"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <svg
              className="w-32 h-32 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">
          Check Your Email
        </h2>
        <p className="text-lg text-blue-100 text-center mb-8 max-w-md">
          We've sent a verification code to <br />
          <span className="font-semibold text-white">{email}</span>
        </p>
        <div className="space-y-4 text-left max-w-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white">Code expires in 10 minutes</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white">
              Check spam folder if not received
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 2) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-white">
        <div className="w-48 h-48 mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <g transform="translate(100,100)">
              <path
                fill="rgba(255,255,255,0.2)"
                d="M42.6,-71.9C56.7,-65.7,70.6,-56.8,77.7,-43.8C84.9,-30.8,85.4,-13.6,82.7,2.6C80,18.8,74.1,34,64.5,45.5C54.9,57,41.6,64.8,27.3,70.5C13,76.1,-2.4,79.6,-17,77.1C-31.6,74.7,-45.3,66.2,-56.3,54.9C-67.3,43.6,-75.6,29.4,-78.2,14.2C-80.9,-1,-77.9,-17.3,-71.1,-31.8C-64.3,-46.3,-53.7,-59,-40.1,-66.1C-26.4,-73.3,-9.8,-74.9,3.9,-75.4C17.6,-75.9,28.4,-75.3,42.6,-71.9Z"
              />
            </g>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">
          Business Registration
        </h2>
        <p className="text-lg text-blue-100 text-center mb-8 max-w-md">
          Secure your business with verified credentials
        </p>
        <div className="space-y-4 text-left max-w-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white">GSTIN verification</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white">FSSAI compliance</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white">Secure data handling</span>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 3) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-white">
        <div className="w-48 h-48 mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-xl"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <svg
              className="w-32 h-32 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">Owner Details</h2>
        <p className="text-lg text-blue-100 text-center mb-8 max-w-md">
          Secure your account with strong credentials
        </p>
        <div className="space-y-4 text-left max-w-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="text-white">256-bit encryption</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white">Password strength indicator</span>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 4) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-white">
        <div className="w-48 h-48 mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <g transform="translate(100,100)">
              <path
                fill="rgba(255,255,255,0.2)"
                d="M42.9,-71.3C57.3,-65.5,71.6,-57.3,78.7,-44.8C85.8,-32.4,85.8,-15.7,83.4,-1C81,13.8,76.2,27.6,67.7,38.9C59.1,50.1,46.8,58.9,33.4,65.1C20,71.4,5.5,75.2,-9.5,74.1C-24.4,73,-39.9,67,-52.7,57.1C-65.5,47.2,-75.6,33.3,-80.5,17.5C-85.4,1.7,-85.1,-16,-78.3,-30.2C-71.4,-44.4,-58,-55,-44.4,-61.5C-30.8,-68.1,-17,-70.5,-2.2,-72C12.6,-73.5,28.5,-74.1,42.9,-71.3Z"
              />
            </g>
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-4 text-center">
          Restaurant Details
        </h2>
        <p className="text-lg text-blue-100 text-center mb-8 max-w-md">
          Complete your restaurant profile to get started
        </p>
        <div className="space-y-4 text-left max-w-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <span className="text-white">
              Customize your restaurant profile
            </span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="text-white">Set delivery areas</span>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-white">Configure operating hours</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
