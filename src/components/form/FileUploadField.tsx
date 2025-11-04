import React from "react";
import FadeInAnimation from "../animations/FadeInAnimation";

interface FileUploadFieldProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
}

const FileUploadField = ({ 
  label, 
  onChange, 
  delay = 0,
  direction = "left"
}: FileUploadFieldProps) => (
  <FadeInAnimation delay={delay} direction={direction}>
    <div className="mb-6 text-center">
      <label className="block mb-3 text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type="file"
        onChange={onChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        accept="image/*"
      />
    </div>
  </FadeInAnimation>
);

export default FileUploadField;