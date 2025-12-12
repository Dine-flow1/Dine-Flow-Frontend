// app/cart/page.tsx - Usage example
'use client';

import { useCart } from '../Context/CartContext';
import CartItemList from '@/components/cart/CartItemList';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    updateSpecialInstructions,
    updateAddons,
    restaurantName,
  } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItemList
            items={items}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
            onUpdateInstructions={updateSpecialInstructions}
            onUpdateAddons={updateAddons}
            restaurantName={restaurantName}
          />
        </div>
        
        <div className="lg:col-span-1">
          {/* Order summary sidebar */}
        </div>
      </div>
    </div>
  );
}