"use client";

import { useState } from "react";
import { MenuItem } from "@/src/types/restruant";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const category = (item as any).category || "Main Course"; // Safe fallback

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${item.name} to cart`);
    alert(`Added ${quantity} ${item.name} to cart!`);
  };

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1">
      {/* Item Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Item Details */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          <span className="text-lg font-bold text-yellow-600">${item.price}</span>
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{item.description}</p>

        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
            {category}
          </span>
        </div>

        {/* Quantity Selector and Add to Cart */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              -
            </button>
            <span className="w-8 font-semibold text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 py-2 font-semibold text-white transition-colors duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}