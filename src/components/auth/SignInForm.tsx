import { ChangeEvent, FormEvent } from 'react';
import { AuthFormData } from '@/types/auth';
import FormInput from '@/components/ui/FormInput';
import SubmitButton from '@/components/ui/SubmitButton';
import SocialLogin from '@/components/auth/SocialLogin';

interface SignInFormProps {
  formData: AuthFormData;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onForgotPassword: (e: React.MouseEvent) => void;
  onSocialLogin: (provider: string) => void;
}

export default function SignInForm({
  formData,
  onInputChange,
  onSubmit,
  onForgotPassword,
  onSocialLogin,
}: SignInFormProps) {
  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit} className="space-y-6">
        <FormInput
          id="signin-email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="you@example.com"
          value={formData.email}
          onChange={onInputChange}
          required
        />

        <FormInput
          id="signin-password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={onInputChange}
          required
        />

        <div className="text-right mb-6">
          <a 
            href="#" 
            onClick={onForgotPassword}
            className="text-[#6b2c3e] text-sm font-medium hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        <SubmitButton type="submit">
          Sign In
        </SubmitButton>
      </form>

      <SocialLogin onSocialLogin={onSocialLogin} />
    </div>
  );
}