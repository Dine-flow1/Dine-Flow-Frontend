"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TrendingItem } from "../../types/Trending";

interface TrendingCardProps {
  item: TrendingItem;
  index: number;
}

export default function TrendingCard({ item, index }: TrendingCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      className="w-56 p-6 transition-all duration-300 bg-white border-2 shadow-lg shrink-0 border-amber-100/80 rounded-3xl hover:shadow-2xl backdrop-blur-sm"
      style={{ 
        minWidth: `224px`,
        background: 'linear-gradient(135deg, #fff 0%, #fefce8 100%)'
      }}
    >
      {item.trending && (
        <motion.span 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + index * 0.1 }}
          className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full shadow-lg bg-linear-to-r from-red-500 to-orange-500 top-4 right-4"
        >
          🔥 Trending
        </motion.span>
      )}

      <motion.div 
        className="mb-4 text-5xl"
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {item.icon}
      </motion.div>
      
      <h3 className="text-xl font-bold text-[#3b2600] mb-3 font-serif">
        {item.name}
      </h3>

      <div className="flex items-center justify-center gap-1 mb-3">
        {[...Array(5)].map((_, idx) => (
          <Star
            key={idx}
            className={`w-4 h-4 ${
              idx < Math.floor(item.rating) 
                ? "text-amber-400 fill-amber-400" 
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-600">
          {item.rating.toFixed(1)}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        <span className="font-bold text-amber-600">{item.orders}+</span> orders today
      </p>
    </motion.div>
  );
}