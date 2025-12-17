'use client';

import { useState } from 'react';
import { Trash2, Plus, Minus, Edit2, X, Check, MessageSquare } from 'lucide-react';
import gsap from 'gsap';

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  isVeg?: boolean;
  spiceLevel?: string;
  rating?: number;
  discount?: number;
  specialInstructions?: string;
  addons?: string[];
  restaurantId?: string;
}

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  onUpdateInstructions?: (id: string, instructions: string) => void;
  onUpdateAddons?: (id: string, addons: string[]) => void;
  compact?: boolean;
  showRestaurantInfo?: boolean;
}

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onUpdateInstructions,
  onUpdateAddons,
  compact = false,
  showRestaurantInfo = false,
}: CartItemProps) {
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [tempInstructions, setTempInstructions] = useState(item.specialInstructions || '');
  const [showAddonManager, setShowAddonManager] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(item.addons || []);

  // Addon options
  const addonOptions = [
    { id: 'extra-cheese', name: 'Extra Cheese', price: 50 },
    { id: 'extra-sauce', name: 'Extra Sauce', price: 20 },
    { id: 'spicy-up', name: 'Extra Spicy', price: 30 },
    { id: 'garlic-bread', name: 'Garlic Bread', price: 80 },
    { id: 'side-salad', name: 'Side Salad', price: 60 },
    { id: 'extra-dip', name: 'Extra Dip', price: 25 },
    { id: 'avocado', name: 'Avocado', price: 70 },
    { id: 'bacon', name: 'Bacon', price: 90 },
  ];

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      // Animation for removal
      gsap.to(`#cart-item-${item.id}`, {
        x: 100,
        opacity: 0,
        height: 0,
        padding: 0,
        margin: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => onRemove(item.id)
      });
    } else {
      // Bounce animation for quantity change
      gsap.to(`#quantity-badge-${item.id}`, {
        scale: 1.3,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
      });
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleIncrement = () => {
    gsap.to(`#increment-btn-${item.id}`, {
      scale: 1.2,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    gsap.to(`#decrement-btn-${item.id}`, {
      scale: 1.2,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });
    handleQuantityChange(item.quantity - 1);
  };

  const handleRemove = () => {
    gsap.to(`#cart-item-${item.id}`, {
      backgroundColor: '#fee2e2',
      duration: 0.2,
      onComplete: () => {
        gsap.to(`#cart-item-${item.id}`, {
          x: 100,
          opacity: 0,
          height: 0,
          padding: 0,
          margin: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => onRemove(item.id)
        });
      }
    });
  };

  const handleSaveInstructions = () => {
    if (onUpdateInstructions) {
      onUpdateInstructions(item.id, tempInstructions);
    }
    setIsEditingInstructions(false);
    
    // Success animation
    gsap.to(`#instructions-save-${item.id}`, {
      scale: 1.3,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      color: '#10b981',
    });
  };

  const handleAddonToggle = (addonName: string) => {
    const newSelectedAddons = selectedAddons.includes(addonName)
      ? selectedAddons.filter(a => a !== addonName)
      : [...selectedAddons, addonName];
    
    setSelectedAddons(newSelectedAddons);
    
    if (onUpdateAddons) {
      onUpdateAddons(item.id, newSelectedAddons);
    }
  };

  const calculateAddonPrice = () => {
    return selectedAddons.reduce((total, addonName) => {
      const addon = addonOptions.find(a => a.name === addonName);
      return total + (addon?.price || 0);
    }, 0);
  };

  const totalPrice = (item.price + calculateAddonPrice()) * item.quantity;

  if (compact) {
    return (
      <div 
        id={`cart-item-${item.id}`}
        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 flex-1">
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-800 truncate">{item.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-600">₹{item.price.toFixed(2)} × {item.quantity}</span>
              {item.isVeg !== undefined && (
                <span className={`text-xs px-1.5 py-0.5 rounded ${
                  item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.isVeg ? 'Veg' : 'Non-Veg'}
                </span>
              )}
            </div>
            {item.specialInstructions && (
              <p className="text-xs text-gray-500 truncate mt-1">
                <MessageSquare size={10} className="inline mr-1" />
                {item.specialInstructions}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="font-semibold text-gray-800">₹{totalPrice.toFixed(2)}</span>
          <button
            onClick={handleRemove}
            className="p-1.5 text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      id={`cart-item-${item.id}`}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-start gap-4">
              {item.image && (
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover border border-gray-100"
                  />
                  {item.discount && item.discount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.discount}% OFF
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    {item.description && (
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.description}</p>
                    )}
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {item.isVeg !== undefined && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.isVeg ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.isVeg ? '🍃 Vegetarian' : '🍖 Non-Vegetarian'}
                        </span>
                      )}
                      
                      {item.spiceLevel && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.spiceLevel === 'Mild' ? 'bg-green-100 text-green-800' :
                          item.spiceLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          🌶️ {item.spiceLevel}
                        </span>
                      )}
                      
                      {item.rating && (
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">
                          ⭐ {item.rating}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button
                    onClick={handleRemove}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors ml-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-gray-700 font-medium">Quantity:</span>
            <div className="flex items-center gap-2">
              <button
                id={`decrement-btn-${item.id}`}
                onClick={handleDecrement}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              >
                <Minus size={18} />
              </button>
              
              <div className="relative">
                <span 
                  id={`quantity-badge-${item.id}`}
                  className="inline-block w-12 text-center text-lg font-bold text-gray-800"
                >
                  {item.quantity}
                </span>
              </div>
              
              <button
                id={`increment-btn-${item.id}`}
                onClick={handleIncrement}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">₹{totalPrice.toFixed(2)}</div>
            {item.quantity > 1 && (
              <div className="text-sm text-gray-500 mt-1">
                ₹{(item.price + calculateAddonPrice()).toFixed(2)} each
              </div>
            )}
          </div>
        </div>

        {/* Special Instructions */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <MessageSquare size={16} />
              Special Instructions
            </label>
            
            {!isEditingInstructions ? (
              <button
                onClick={() => setIsEditingInstructions(true)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Edit2 size={14} />
                Edit
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditingInstructions(false);
                  setTempInstructions(item.specialInstructions || '');
                }}
                className="text-sm text-gray-600 hover:text-gray-700 flex items-center gap-1"
              >
                <X size={14} />
                Cancel
              </button>
            )}
          </div>
          
          {isEditingInstructions ? (
            <div className="flex gap-2">
              <textarea
                value={tempInstructions}
                onChange={(e) => setTempInstructions(e.target.value)}
                placeholder="Add special instructions (e.g., no onions, extra spicy, less oil...)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                rows={2}
              />
              <button
                id={`instructions-save-${item.id}`}
                onClick={handleSaveInstructions}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Check size={16} />
                Save
              </button>
            </div>
          ) : (
            <div className="min-h-[3rem]">
              {item.specialInstructions ? (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-gray-700">{item.specialInstructions}</p>
                </div>
              ) : (
                <div className="text-gray-400 italic text-sm p-3 border border-dashed border-gray-300 rounded-lg">
                  No special instructions added
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add-ons Manager */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Add-ons (Optional)</label>
            <button
              onClick={() => setShowAddonManager(!showAddonManager)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {showAddonManager ? 'Hide Add-ons' : 'Manage Add-ons'}
            </button>
          </div>
          
          {/* Selected Add-ons Preview */}
          {selectedAddons.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2">
                {selectedAddons.map((addonName, index) => {
                  const addon = addonOptions.find(a => a.name === addonName);
                  return (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm"
                    >
                      {addonName}
                      <button
                        onClick={() => handleAddonToggle(addonName)}
                        className="text-blue-500 hover:text-blue-700 ml-1"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Add-ons Grid */}
          {showAddonManager && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2">
              {addonOptions.map((addon) => (
                <label
                  key={addon.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedAddons.includes(addon.name)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addon.name)}
                    onChange={() => handleAddonToggle(addon.name)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">{addon.name}</div>
                    <div className="text-xs text-gray-600 mt-1">+₹{addon.price}</div>
                  </div>
                </label>
              ))}
            </div>
          )}
          
          {/* Add-ons Price Summary */}
          {calculateAddonPrice() > 0 && (
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg mt-3">
              <span className="text-sm text-gray-700">Add-ons Total</span>
              <span className="font-semibold text-gray-800">
                +₹{calculateAddonPrice().toFixed(2)} ({selectedAddons.length} items)
              </span>
            </div>
          )}
        </div>

        {/* Item Price Breakdown */}
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Item Price ({item.quantity} × ₹{item.price.toFixed(2)})</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
          {calculateAddonPrice() > 0 && (
            <div className="flex justify-between text-sm text-gray-600 mt-1">
              <span>Add-ons</span>
              <span>+₹{(calculateAddonPrice() * item.quantity).toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold text-gray-900 mt-2 pt-2 border-t">
            <span>Total for this item</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Restaurant Info */}
        {showRestaurantInfo && item.restaurantId && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-700">R</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">From restaurant:</p>
                <p className="font-medium text-gray-800">{item.restaurantId}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}