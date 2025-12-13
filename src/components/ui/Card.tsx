import React, { useState, ReactNode } from 'react';
import { Star, TrendingUp, ShoppingBag, Heart, Eye, Share2, Clock, Users, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Export the interface
export interface CardProps {
  title: string;
  rating: number;
  orders: number;
  trending?: boolean;
  imageUrl: string;
  description: string;
  price: string;
  category?: string;
  preparationTime?: string;
  serves?: number;
  isVegetarian?: boolean;
  isSpicy?: boolean;
  isFavorite?: boolean;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  onToggleFavorite?: () => void;
  onShare?: () => void;
  tags?: string[];
  discount?: string;
  originalPrice?: string;
  outOfStock?: boolean;
  maxOrderQuantity?: number;
  children?: ReactNode;
  className?: string;
}

// Main Card component
const Card = ({ 
  title, 
  rating, 
  orders, 
  trending = false, 
  imageUrl, 
  description,
  price,
  category = "Main Course",
  preparationTime = "20-30 min",
  serves = 2,
  isVegetarian = false,
  isSpicy = false,
  isFavorite = false,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  onShare,
  tags = [],
  discount,
  originalPrice,
  outOfStock = false,
  maxOrderQuantity = 10,
  children,
  className,
  ...props
}: CardProps & React.HTMLAttributes<HTMLDivElement>) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavoriteLocal, setIsFavoriteLocal] = useState(isFavorite);
  const [quantity, setQuantity] = useState(1);

  // ... (rest of your Card component implementation)
  // Keep your existing Card component code here

  return (
    <div 
      className={`relative overflow-hidden transition-all duration-300 
      bg-white border border-gray-100 shadow-lg rounded-2xl 
      hover:shadow-2xl group ${className || ''}`}
      {...props}
    >
      {/* ... your Card JSX ... */}
      {children}
    </div>
  );
};

// Export as default
export default Card;

// Create and export simple wrapper components
export const CardWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <div 
    className={`bg-white rounded-lg border shadow-sm ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <div 
    className={`p-6 ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <h3 
    className={`text-2xl font-semibold ${className || ''}`}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <p 
    className={`text-sm text-gray-500 ${className || ''}`}
    {...props}
  >
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <div 
    className={`p-6 pt-0 ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ 
  children, 
  className, 
  ...props 
}) => (
  <div 
    className={`p-6 pt-0 ${className || ''}`}
    {...props}
  >
    {children}
  </div>
);