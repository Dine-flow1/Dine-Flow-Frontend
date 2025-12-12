'use client';

import { useState } from 'react';
import { useCart } from '../../Context/CartContext';
import { ShoppingCart, X, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';

export const MiniCart = () => {
  const [isHovering, setIsHovering] = useState(false);
  const { items, totalQuantity, totalAmount, getCartSubtotal } = useCart();

  const handleMouseEnter = () => {
    setIsHovering(true);
    gsap.to('.mini-cart-dropdown', {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    gsap.to('.mini-cart-dropdown', {
      opacity: 0,
      y: -10,
      duration: 0.2,
      ease: 'power2.in',
    });
  };

  if (items.length === 0) {
    return (
      <Link href="/cart" className="relative p-2">
        <ShoppingCart size={24} className="text-gray-700" />
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Cart Icon with Badge */}
      <Link href="/cart" className="relative p-2 block">
        <ShoppingCart size={24} className="text-gray-700" />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
      </Link>

      {/* Dropdown Cart Preview */}
      {isHovering && (
        <div className="mini-cart-dropdown absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 opacity-0 transform -translate-y-10">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Your Cart</h3>
              <span className="text-sm text-gray-600">{totalQuantity} items</span>
            </div>
            
            {/* Cart Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
              {items.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                  {item.image && typeof item.image === 'string' && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600">
                      {item.quantity} × ₹{item.price}
                    </p>
                  </div>
                  <span className="font-semibold text-gray-800">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              
              {items.length > 3 && (
                <div className="text-center text-sm text-gray-500 py-2">
                  +{items.length - 3} more items
                </div>
              )}
            </div>
            
            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">₹{getCartSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Total:</span>
                <span className="text-lg font-bold text-gray-900">₹{totalAmount.toFixed(2)}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <Link
                  href="/cart"
                  className="flex-1 py-2 bg-gray-100 text-gray-800 rounded-lg text-center font-medium hover:bg-gray-200 transition"
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-center font-medium hover:bg-blue-700 transition flex items-center justify-center gap-1"
                >
                  Checkout
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};