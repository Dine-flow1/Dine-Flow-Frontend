import React from 'react';

interface OtpSectionProps {
  otp: string;
  onOtpChange: (otp: string) => void;
  onVerify: () => void;
  isVerified: boolean;
  loading?: boolean; // Add this line
}

const OtpSection: React.FC<OtpSectionProps> = ({
  otp,
  onOtpChange,
  onVerify,
  isVerified,
  loading = false // Add default value
}) => {
  return (
    <div className="otp-section p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-3">Verify OTP</h3>
      
      <div className="flex gap-2 mb-3">
        <input
          type="text"
          value={otp}
          onChange={(e) => onOtpChange(e.target.value)}
          placeholder="Enter OTP"
          disabled={isVerified || loading}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
          maxLength={6}
        />
        
        <button
          onClick={onVerify}
          disabled={isVerified || loading || otp.length !== 6}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Verifying...' : isVerified ? 'Verified' : 'Verify OTP'}
        </button>
      </div>
      
      {isVerified && (
        <div className="text-green-600 font-medium success-indicator">
          ✅ OTP Verified Successfully!
        </div>
      )}
    </div>
  );
};

export default OtpSection;