'use client';

import CartItem from './CartItem';

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId?: string;
  instructions?: string;
  addons?: string[];
}
import { ShoppingBag, AlertCircle } from 'lucide-react';

interface CartItemListProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onUpdateInstructions?: (id: string, instructions: string) => void;
  onUpdateAddons?: (id: string, addons: string[]) => void;
  compact?: boolean;
  showEmptyState?: boolean;
  restaurantName?: string;
}

export default function CartItemList({
  items,
  onUpdateQuantity,
  onRemove,
  onUpdateInstructions,
  onUpdateAddons,
  compact = false,
  showEmptyState = true,
  restaurantName,
}: CartItemListProps) {
  if (items.length === 0 && showEmptyState) {
    return (
      <div className="text-center py-12">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gray-100 rounded-full"></div>
          <ShoppingBag className="absolute inset-0 m-auto text-gray-400" size={48} />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
        <p className="text-gray-600 max-w-sm mx-auto">
          Add delicious items from our menu to get started with your order
        </p>
      </div>
    );
  }

  // Group items by restaurant (if needed)
  const itemsByRestaurant = items.reduce((groups, item) => {
    const key = item.restaurantId || 'default';
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(item);
    return groups;
  }, {} as Record<string, CartItemType[]>);

  return (
    <div className="space-y-4">
      {restaurantName && (
        <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white border border-blue-200 flex items-center justify-center">
              <span className="text-blue-600 font-bold">🏪</span>
            </div>
            <div>
              <p className="text-sm text-blue-700">Ordering from</p>
              <h3 className="font-semibold text-gray-900">{restaurantName}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Single restaurant cart */}
      {Object.keys(itemsByRestaurant).length === 1 && (
        <div className="space-y-4">
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
              onUpdateInstructions={onUpdateInstructions}
              onUpdateAddons={onUpdateAddons}
              compact={compact}
            />
          ))}
        </div>
      )}

      {/* Multi-restaurant cart (if needed in future) */}
      {Object.keys(itemsByRestaurant).length > 1 && (
        <>
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
              <div>
                <p className="text-sm text-yellow-800 font-medium">
                  Items from multiple restaurants
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Note: These items will be delivered separately
                </p>
              </div>
            </div>
          </div>

          {Object.entries(itemsByRestaurant).map(([restaurantId, restaurantItems], index) => (
            <div key={restaurantId} className="space-y-4">
              <div className="border-b pb-2">
                <h4 className="font-semibold text-gray-800">
                  Restaurant {index + 1} ({restaurantItems.length} items)
                </h4>
              </div>
              
              {restaurantItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                  onUpdateInstructions={onUpdateInstructions}
                  onUpdateAddons={onUpdateAddons}
                  compact={compact}
                  showRestaurantInfo={true}
                />
              ))}
            </div>
          ))}
        </>
      )}

      {/* Cart Summary */}
      {items.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 mt-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-lg font-semibold text-gray-800">
                {items.reduce((sum, item) => sum + item.quantity, 0)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Unique Items</p>
              <p className="text-lg font-semibold text-gray-800">{items.length}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}