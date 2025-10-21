import { ChangeEvent } from 'react';

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
}

export default function FormInput({
  id,
  name,
  type,
  label,
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  maxLength,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 bg-white focus:outline-none focus:border-[#6b2c3e] focus:ring-3 focus:ring-[#6b2c3e]/10 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  );
}