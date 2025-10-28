import { TextareaHTMLAttributes } from 'react';

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextAreaField = ({ label, error, id, ...props }: TextAreaFieldProps) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="md:col-span-2">
      <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={inputId}
        className={`w-full px-4 py-3 transition-colors border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        rows={3}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};