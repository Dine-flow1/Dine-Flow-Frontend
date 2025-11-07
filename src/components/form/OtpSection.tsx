import React from 'react';
import InputField from './InputField';
import Button from '../ui/Buttons';

interface Props {
  otp: string;
  onOtpChange: (val: string) => void;
  onVerify: () => void;
  isVerified: boolean;
}

const OtpSection = ({ otp, onOtpChange, onVerify, isVerified }: Props) => (
  <div className="mt-4 md:col-span-2">
    <InputField
      label="Enter OTP"
      name="otp"
      value={otp}
      onChange={(e) => onOtpChange(e.target.value)}
      placeholder="Enter 6-digit OTP"
      maxLength={6}
    />
    <Button 
      type="button" 
      variant={isVerified ? "primary" : "secondary"} 
      onClick={onVerify} 
      className="mt-2"
      disabled={isVerified}
    >
      {isVerified ? "✅ Verified" : "Verify OTP"}
    </Button>
  </div>
);

export default OtpSection;