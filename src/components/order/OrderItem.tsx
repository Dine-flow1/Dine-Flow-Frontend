"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { OrderItemType } from '../../types/order';

interface OrderItemProps {
  item: OrderItemType;
  delay?: number;
}

const OrderItem = ({ item, delay = 0 }: OrderItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(itemRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, delay, ease: "power2.out" }
      );
    }
  }, [delay]);

  return (
    <div ref={itemRef} className="p-6 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center text-white text-2xl">
            {item.image}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.name}
              </h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                  Qty: {item.quantity}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                ${item.price.toFixed(2)} each
              </p>
            </div>
          </div>

          {item.specialInstructions && (
            <div className="mb-3">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Special Instructions: </span>
                {item.specialInstructions}
              </p>
            </div>
          )}

          {item.addons && item.addons.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-700 mb-1">Add-ons:</p>
              <div className="flex flex-wrap gap-2">
                {item.addons.map((addon, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full"
                  >
                    {addon}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
              🔄 Reorder Item
            </button>
            <button className="text-gray-400 hover:text-red-500 transition-colors duration-200">
              ⭐ Rate Item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;