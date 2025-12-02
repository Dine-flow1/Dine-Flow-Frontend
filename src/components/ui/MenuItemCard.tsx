"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MenuItem } from "@/types/restaurant";
import { showSuccessAlert, showInfoAlert, showSuccessToast } from "../../utils/sweetAlert";
import QuantitySelector from "./MenuItemCard/QuantitySelector";
import ActionButtons from "./MenuItemCard/ActionButtons";

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const category = (item as any).category || "Main Course";

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${item.name} to cart`);
    showSuccessToast(`Added ${quantity} ${item.name} to cart! 🛒`);
  };

  const handleOrderNow = () => {
    showInfoAlert(
      `You're ordering ${quantity} ${item.name}. You'll be redirected to checkout to complete your order.`,
      'Order Confirmation'
    ).then((result) => {
      if (result.isConfirmed) {
        router.push(`/checkout?item=${item.id}&quantity=${quantity}`);
      }
    });
  };

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
          <span className="text-lg font-bold text-yellow-600">${item.price}</span>
        </div>

        <p className="mb-4 text-sm text-gray-600 line-clamp-2">{item.description}</p>

        <div className="mb-3">
          <span className="inline-block px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-full">
            {category}
          </span>
        </div>

        <QuantitySelector
          quantity={quantity}
          onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
          onIncrease={() => setQuantity(quantity + 1)}
        />

        <ActionButtons onAddToCart={handleAddToCart} onOrderNow={handleOrderNow} />
      </div>
    </div>
  );
}