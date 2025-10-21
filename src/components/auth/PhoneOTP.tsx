import { ChangeEvent } from 'react';
import { OTPState } from '@/types/auth';
import FormInput from '@/components/ui/FormInput';

interface PhoneOTPProps {
  phone: string;
  otp: string;
  otpState: OTPState;
  onPhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOtpChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRequestOTP: () => void;
  onVerifyOTP: () => void;
}

export default function PhoneOTP({
  phone,
  otp,
  otpState,
  onPhoneChange,
  onOtpChange,
  onRequestOTP,
  onVerifyOTP,
}: PhoneOTPProps) {
  return (
    <>
      <div>
        <label htmlFor="signup-phone" className="block text-sm font-medium text-gray-800 mb-2">
          Phone Number
        </label>
        <div className="flex gap-2">
          <input
            type="tel"
            id="signup-phone"
            name="phone"
            placeholder="+1 (555) 123-4567"
            value={phone}
            onChange={onPhoneChange}
            required
            disabled={otpState.requested}
            className="flex-1 px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white focus:outline-none focus:border-[#6b2c3e] focus:ring-3 focus:ring-[#6b2c3e]/10 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          {!otpState.requested ? (
            <button
              type="button"
              onClick={onRequestOTP}
              className="px-4 py-3.5 bg-[#6b2c3e] text-white border-none rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 whitespace-nowrap hover:bg-[#5a2434]"
            >
              Send OTP
            </button>
          ) : (
            <div className={`px-4 py-3.5 rounded-xl text-sm font-medium whitespace-nowrap ${
              otpState.verified 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {otpState.verified ? '✓ Verified' : 'OTP Sent'}
            </div>
          )}
        </div>
      </div>

      {otpState.requested && !otpState.verified && (
        <div>
          <label htmlFor="signup-otp" className="block text-sm font-medium text-gray-800 mb-2">
            Enter OTP
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="signup-otp"
              name="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={onOtpChange}
              maxLength={6}
              className="flex-1 px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white focus:outline-none focus:border-[#6b2c3e] focus:ring-3 focus:ring-[#6b2c3e]/10"
            />
            <button
              type="button"
              onClick={onVerifyOTP}
              className="px-4 py-3.5 bg-[#6b2c3e] text-white border-none rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 whitespace-nowrap hover:bg-[#5a2434]"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </>
  );
}