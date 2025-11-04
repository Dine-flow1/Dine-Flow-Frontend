import { clsx } from "clsx";
import { ReactNode } from 'react';

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({ 
  variant = "primary", 
  children, 
  onClick, 
  className,
  type = "button",
  disabled = false
}: ButtonProps) => {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-linear-to-r from-amber-500 to-amber-700 hover:bg-primary-700 text-white focus:ring-primary-500 shadow-lg hover:shadow-xl",
    secondary: "bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 focus:ring-gray-500 shadow-md hover:shadow-lg"
  };

  const disabledStyles = "opacity-50 cursor-not-allowed transform-none hover:scale-100";

  return (
    <button 
      type={type}
      className={clsx(
        baseStyles, 
        variants[variant], 
        disabled && disabledStyles,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;