'use client'

import { GoogleIcon,  } from '@/components/icons';
import { FaFacebook } from 'react-icons/fa';

interface SocialLoginProps {
  onSocialLogin: (provider: string) => void;
}

export default function SocialLogin({ onSocialLogin }: SocialLoginProps) {
  return (
    <>
      <div className="flex items-center my-6 text-sm text-gray-500">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="px-4">or continue with</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onSocialLogin('google')}
          className="flex-1 py-3 px-4 border-2 border-gray-200 bg-white rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:border-[#6b2c3e] hover:bg-gray-50"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          onClick={() => onSocialLogin('microsoft')}
          className="flex-1 py-3 px-4 border-2 border-gray-200 bg-white rounded-xl cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 font-medium hover:border-[#6b2c3e] hover:bg-gray-50"
        >
          <FaFacebook/>
          Facebook
        </button>
      </div>
    </>
  );
}