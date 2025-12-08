"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/types/restaurant";
import { showSuccessToast, showInfoAlert } from "../../utils/sweetAlert";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const category = item.category || "Main Course";
  const isVeg = item.type === "veg";

  const handleAddToCart = () => {
    showSuccessToast(`Added ${quantity} × ${item.name} to cart!`);
  };

  const handleOrderNow = () => {
    showInfoAlert(
      `You're ordering ${quantity} × ${item.name}. Redirecting to checkout...`,
      "Confirm Order"
    ).then((result) => {
      if (result.isConfirmed) {
        router.push(`/checkout?item=${item._id}&quantity=${quantity}`);
      }
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Food Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
        />

        {/* Price Tag */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow text-gray-900 font-semibold text-sm">
          ₹{item.price}
        </div>

        {/* Veg / Non-Veg Icon */}
        {isVeg !== undefined && (
          <div className="absolute top-3 left-3">
            <div
              className={`w-4 h-4 border-2 ${
                isVeg ? "border-green-700" : "border-red-700"
              } rounded-sm flex items-center justify-center`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isVeg ? "bg-green-700" : "bg-red-700"
                }`}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* TEXT SECTION */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Category Chip */}
        <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
          {category}
        </span>

        {/* Quantity */}
        <div className="flex items-center gap-3 mb-4">
          <button
            className="w-8 h-8 rounded-lg border flex items-center justify-center text-gray-700 hover:bg-gray-200"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            −
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            className="w-8 h-8 rounded-lg border flex items-center justify-center text-gray-700 hover:bg-gray-200"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 rounded-xl border border-yellow-500 text-yellow-600 hover:bg-yellow-50 transition font-semibold"
          >
            Add to Cart
          </button>

          <button
            onClick={handleOrderNow}
            className="flex-1 py-2 rounded-xl bg-yellow-500 text-white hover:bg-yellow-600 transition font-semibold shadow"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
