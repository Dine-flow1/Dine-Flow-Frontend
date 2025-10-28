import React, { useState } from "react";

interface FileUploadFieldProps {
  label: string;
  accept?: string;
  onChange: (file: File | null) => void;
  showPreview?: boolean;
  previewShape?: 'circle' | 'rectangle';
}

export const FileUploadField = ({
  label,
  accept = "image/*",
  onChange,
  showPreview = false,
  previewShape = 'rectangle',
}: FileUploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
    if (file && showPreview) setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
      {showPreview && preview && (
        <img
          src={preview}
          alt="Preview"
          className={`mb-2 ${previewShape === 'circle' ? 'w-32 h-32 rounded-full' : 'w-full h-40 rounded-lg'} object-cover`}
        />
      )}
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
    </div>
  );
};
