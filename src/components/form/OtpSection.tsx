import React from 'react';
import InputField from './InputField';
import Button from './../Buttons';

interface Props {
  otp: string;
  onOtpChange: (val: string) => void;
  onVerify: () => void;
}

const OtpSection = ({ otp, onOtpChange, onVerify }: Props) => (
  <div className="mt-4 md:col-span-2">
    <InputField
      label="Enter OTP"
      name="otp"
      value={otp}
      onChange={(e) => onOtpChange(e.target.value)}
      placeholder="Enter 6-digit OTP"
    />
    <Button type="button" variant="secondary" onClick={onVerify} className="mt-2">
      Verify OTP
    </Button>
  </div>
);

export default OtpSection;
