interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection = ({ title, children, className = '' }: FormSectionProps) => {
  return (
    <div className={`mb-8 ${className}`}>
      <h3 className="pb-2 mb-6 font-serif text-2xl font-bold text-gray-900 border-b">
        {title}
      </h3>
      {children}
    </div>
  );
};