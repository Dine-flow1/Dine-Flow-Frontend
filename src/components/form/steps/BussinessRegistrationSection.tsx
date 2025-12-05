interface BusinessRegistrationStepProps {
  formData: {
    panNumber: string;
    gstinNumber: string;
    fssaiNumber: string;
    registrationNumber: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const BusinessRegistrationStep = ({
  formData,
  onChange,
  onNext,
  onPrev
}: BusinessRegistrationStepProps) => {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Business Details
        </h3>
        <p className="text-gray-600">
          Enter your official business registration information
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            PAN Number *
          </label>
          <div className="relative">
            <input
              type="text"
              name="panNumber"
              value={formData.panNumber}
              onChange={onChange}
              required
              className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
              placeholder="ABCDE1234F"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 mt-1">Permanent Account Number</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            GSTIN Number *
          </label>
          <div className="relative">
            <input
              type="text"
              name="gstinNumber"
              value={formData.gstinNumber}
              onChange={onChange}
              required
              className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
              placeholder="22ABCDE1234F1Z5"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 mt-1">Goods & Services Tax Identification Number</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            FSSAI License Number *
          </label>
          <div className="relative">
            <input
              type="text"
              name="fssaiNumber"
              value={formData.fssaiNumber}
              onChange={onChange}
              required
              className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none transition-all"
              placeholder="XXXXXXXXXXXXXX"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 mt-1">Food Safety and Standards Authority of India</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Business Registration Number *
          </label>
          <div className="relative">
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={onChange}
              required
              className="w-full px-4 py-3 pl-11 bg-white border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all"
              placeholder="XXXXXXXXX"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>
          <p className="text-xs text-gray-500 mt-1">Company/LLP Registration Number</p>
        </div>

        <div className="pt-6 space-y-4">
          <button
            type="button"
            onClick={onNext}
            disabled={!formData.panNumber || !formData.gstinNumber || !formData.fssaiNumber || !formData.registrationNumber}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold rounded-xl hover:from-emerald-700 hover:to-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Continue to Owner Details
          </button>
          
          <button
            type="button"
            onClick={onPrev}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all"
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};