import { ChangeEvent, FormEvent } from 'react';
import { AuthFormData, OTPState } from '@/types/auth';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';
import PhoneOTP from '@/components/auth/PhoneOTP';
import AddressForm from '@/components/auth/AddressForm';

interface SignUpFormProps {
  formData: AuthFormData;
  otpState: OTPState;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onRequestOTP: () => void;
  onVerifyOTP: () => void;
}

export default function SignUpForm({
  formData,
  otpState,
  onInputChange,
  onSubmit,
  onRequestOTP,
  onVerifyOTP,
}: SignUpFormProps) {
  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <FormInput
          id="signup-name"
          name="name"
          type="text"
          label="Full Name"
          placeholder="John Doe"
          value={formData.name || ''}
          onChange={onInputChange}
          required
        />

        <FormInput
          id="signup-email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={formData.email}
          onChange={onInputChange}
          required
        />

        <PhoneOTP
          phone={formData.phone || ''}
          otp={formData.otp || ''}
          otpState={otpState}
          onPhoneChange={onInputChange}
          onOtpChange={onInputChange}
          onRequestOTP={onRequestOTP}
          onVerifyOTP={onVerifyOTP}
        />

        <FormInput
          id="signup-password"
          name="password"
          type="password"
          label="Password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={onInputChange}
          required
        />

        <FormInput
          id="signup-confirm"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Re-enter your password"
          value={formData.confirmPassword || ''}
          onChange={onInputChange}
          required
        />

        {formData.address && (
          <AddressForm
            address={formData.address}
            onChange={onInputChange}
          />
        )}

        <SubmitButton type="submit">
          Create Account
        </SubmitButton>
      </form>

      <div className="text-center text-sm text-gray-600 leading-relaxed pt-4">
        By signing up, you agree to our{' '}
        <a href="#" className="text-[#6b2c3e] font-medium hover:underline">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-[#6b2c3e] font-medium hover:underline">
          Privacy Policy
        </a>
      </div>
    </div>
  );
}