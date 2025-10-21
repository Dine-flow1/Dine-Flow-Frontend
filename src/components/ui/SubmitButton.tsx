interface SubmitButtonProps {
  type: 'submit' | 'button';
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function SubmitButton({ 
  type, 
  onClick, 
  children, 
  variant = 'primary' 
}: SubmitButtonProps) {
  const baseClasses = "w-full py-4 text-white border-none rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-[#d4a574] to-[#c49563] shadow-lg shadow-[#d4a574]/30 hover:shadow-xl hover:shadow-[#d4a574]/40",
    secondary: "bg-[#6b2c3e] shadow-lg shadow-[#6b2c3e]/30 hover:shadow-xl hover:shadow-[#6b2c3e]/40"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
}