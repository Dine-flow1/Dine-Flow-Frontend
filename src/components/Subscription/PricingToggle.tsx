"use client";
import { motion } from "framer-motion";

interface PricingToggleProps {
  isYearly: boolean;
  onToggle: (yearly: boolean) => void;
}

export default function PricingToggle({ isYearly, onToggle }: PricingToggleProps) {
  return (
    <div className="flex items-center justify-center gap-4 mb-12">
      <span className={`font-semibold ${!isYearly ? 'text-amber-600' : 'text-gray-500'}`}>
        Monthly
      </span>
      
      <button
        onClick={() => onToggle(!isYearly)}
        className={`relative w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
          isYearly ? 'bg-amber-500' : 'bg-gray-300'
        }`}
      >
        <motion.div
          className="w-5 h-5 bg-white rounded-full shadow-lg"
          animate={{ x: isYearly ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      
      <div className="flex items-center gap-2">
        <span className={`font-semibold ${isYearly ? 'text-amber-600' : 'text-gray-500'}`}>
          Yearly
        </span>
        <span className="px-2 py-1 text-xs font-bold text-white bg-green-500 rounded-full">
          Save 20%
        </span>
      </div>
    </div>
  );
}