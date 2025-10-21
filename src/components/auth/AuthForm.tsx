'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { AuthFormData, AuthTab, OTPState } from '@/types/auth';
import AuthHeader from '@/components/auth/AuthHeader';
import TabNavigation from '@/components/auth/TabNavigation';
import SignInForm from '@/components/auth/SignInForm';
import SignUpForm from '@/components/auth/SignUpForm';

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState<AuthTab>('signin');
  const [formData, setFormData] = useState<AuthFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    otp: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });
  const [otpState, setOtpState] = useState<OTPState>({
    requested: false,
    verified: false,
    phone: '',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, []);

  const switchTab = (tab: AuthTab) => {
    setActiveTab(tab);
    if (formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, x: tab === 'signin' ? -20 : 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address!,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent, type: AuthTab) => {
    e.preventDefault();
    
    if (type === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (!otpState.verified && formData.phone) {
        alert('Please verify your phone number with OTP');
        return;
      }
    }

    console.log(`${type === 'signin' ? 'Signing in' : 'Creating account'} with:`, formData);
    alert(type === 'signin' ? 'Signing in...' : 'Creating account...');
  };

  const requestOTP = async () => {
    if (!formData.phone) {
      alert('Please enter your phone number');
      return;
    }

    console.log('Requesting OTP for:', formData.phone);
    setOtpState({
      requested: true,
      verified: false,
      phone: formData.phone
    });
    alert('OTP sent to your phone number');
  };

  const verifyOTP = () => {
    if (!formData.otp) {
      alert('Please enter the OTP');
      return;
    }

    console.log('Verifying OTP:', formData.otp);
    setOtpState(prev => ({ ...prev, verified: true }));
    alert('Phone number verified successfully!');
  };

  const socialLogin = (provider: string) => {
    console.log('Logging in with:', provider);
    alert(`Logging in with ${provider}`);
  };

  const showForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Password reset link would be sent to your email');
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-5 py-8 bg-linear-to-br from-[#6b2c3e] to-[#4a1f2d] font-['Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <div 
        ref={containerRef}
        className="w-full max-w-md overflow-hidden shadow-2xl bg-white/95 backdrop-blur-sm rounded-2xl"
      >
        <AuthHeader activeTab={activeTab} />

        <div className="px-8 py-10">
          <TabNavigation activeTab={activeTab} onTabChange={switchTab} />

          <div ref={formRef}>
            {activeTab === 'signin' && (
              <SignInForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={(e) => handleSubmit(e, 'signin')}
                onForgotPassword={showForgotPassword}
                onSocialLogin={socialLogin}
              />
            )}

            {activeTab === 'signup' && (
              <SignUpForm
                formData={formData}
                otpState={otpState}
                onInputChange={handleInputChange}
                onSubmit={(e) => handleSubmit(e, 'signup')}
                onRequestOTP={requestOTP}
                onVerifyOTP={verifyOTP}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}