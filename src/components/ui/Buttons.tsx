import { clsx } from "clsx";
import { ReactNode, forwardRef } from 'react';

interface ButtonProps {
  variant?: "primary" | "secondary" | "outline";
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ 
  variant = "primary", 
  children, 
  onClick, 
  className,
  type = "button",
  disabled = false,
  size = "md",
  fullWidth = false,
  loading = false
}: ButtonProps, ref) => {
  // Base styles with mobile-first responsive design
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg border border-transparent whitespace-nowrap";
  
  // Size variants - mobile first, then tablet, then desktop
  const sizes = {
    sm: "px-3 py-1.5 text-xs min-h-8 sm:px-3 sm:py-2 sm:text-sm sm:min-h-9",
    md: "px-4 py-2.5 text-sm min-h-10 sm:px-5 sm:py-3 sm:text-base sm:min-h-12",
    lg: "px-5 py-3 text-base min-h-12 sm:px-6 sm:py-3.5 sm:text-lg sm:min-h-14",
    xl: "px-6 py-3.5 text-lg min-h-14 sm:px-8 sm:py-4 sm:text-xl sm:min-h-16"
  };

  // Color variants with responsive hover effects
  const variants = {
    primary: clsx(
      "bg-gradient-to-r from-amber-500 to-amber-600 text-white",
      "hover:from-amber-600 hover:to-amber-700",
      "active:from-amber-700 active:to-amber-800",
      "focus:ring-amber-500 focus:ring-offset-white",
      "shadow-sm hover:shadow-md active:shadow-sm",
      "disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-500"
    ),
    secondary: clsx(
      "bg-white text-gray-900 border border-gray-300",
      "hover:bg-gray-50 hover:border-gray-400",
      "active:bg-gray-100 active:border-gray-500",
      "focus:ring-gray-500 focus:ring-offset-white",
      "shadow-sm hover:shadow-md active:shadow-sm",
      "disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200"
    ),
    outline: clsx(
      "bg-transparent text-amber-600 border border-amber-600",
      "hover:bg-amber-50 hover:text-amber-700 hover:border-amber-700",
      "active:bg-amber-100 active:text-amber-800 active:border-amber-800",
      "focus:ring-amber-500 focus:ring-offset-white",
      "disabled:bg-transparent disabled:text-gray-400 disabled:border-gray-300"
    )
  };

  // Width handling
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  // Disabled and loading states
  const stateStyles = disabled || loading ? "opacity-60 cursor-not-allowed transform-none" : "hover:scale-105 active:scale-95";

  // Loading spinner
  const LoadingSpinner = () => (
    <svg 
      className="w-4 h-4 mr-2 -ml-1 animate-spin" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  return (
    <button 
      ref={ref}
      type={type}
      className={clsx(
        baseStyles, 
        sizes[size],
        variants[variant],
        widthStyles,
        stateStyles,
        !disabled && !loading && "transition-transform duration-150",
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && <LoadingSpinner />}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;