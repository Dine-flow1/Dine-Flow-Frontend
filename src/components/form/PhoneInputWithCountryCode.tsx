"use client";

import React from "react";

interface Country {
  name: string;
  code: string;
}

interface PhoneInputWithCountryCodeProps {
  countryCode: string;
  phone: string;
  onCountryCodeChange?: (value: string) => void; 
  onPhoneChange?: (value: string) => void;       
  error?: string;
}

const countries: Country[] = [
  { name: "India", code: "+91" },
  { name: "United States", code: "+1" },
  { name: "Canada", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
];

const PhoneInputWithCountryCode: React.FC<PhoneInputWithCountryCodeProps> = ({
  countryCode,
  phone,
  onCountryCodeChange,
  onPhoneChange,
  error,
}) => {
  
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onCountryCodeChange) onCountryCodeChange(e.target.value);
    else console.warn("⚠️ onCountryCodeChange not provided");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onPhoneChange) onPhoneChange(e.target.value);
    else console.warn("⚠️ onPhoneChange not provided");
  };

  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Phone Number
      </label>

      <div className="flex gap-2">
        <select
          value={countryCode}
          onChange={handleCountryChange}
          className={`w-1/3 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Code</option>
          {countries.map((c, index) => (
            <option key={`${c.code}-${index}`} value={c.code}>
              {c.name} ({c.code})
            </option>
          ))}
        </select>

        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          placeholder="Enter phone number"
          className={`flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default PhoneInputWithCountryCode;
