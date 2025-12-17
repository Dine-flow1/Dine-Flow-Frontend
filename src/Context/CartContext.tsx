'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  isVeg: undefined;
  image: React.JSX.Element;
  id: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
  addons?: string[];
}

interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  restaurantId: string | null;
  restaurantName: string | null;
  addItem: (item: CartItem, restaurantId: string, restaurantName: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  updateSpecialInstructions: (id: string, instructions: string) => void;
  updateAddons: (id: string, addons: string[]) => void;
  getItemCount: () => number;
  getCartSubtotal: () => number;
  getCartTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedRestaurantId = localStorage.getItem('cart_restaurant_id');
    const savedRestaurantName = localStorage.getItem('cart_restaurant_name');
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    if (savedRestaurantId) {
      setRestaurantId(savedRestaurantId);
    }
    if (savedRestaurantName) {
      setRestaurantName(savedRestaurantName);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    if (restaurantId) {
      localStorage.setItem('cart_restaurant_id', restaurantId);
    }
    if (restaurantName) {
      localStorage.setItem('cart_restaurant_name', restaurantName);
    }
  }, [items, restaurantId, restaurantName]);

  const addItem = (item: CartItem, newRestaurantId: string, newRestaurantName: string) => {
    setItems(prevItems => {
      // Check if restaurant is different
      if (restaurantId && restaurantId !== newRestaurantId) {
        if (window.confirm('Your cart contains items from another restaurant. Do you want to clear the cart and add items from this restaurant?')) {
          setRestaurantId(newRestaurantId);
          setRestaurantName(newRestaurantName);
          return [item];
        } else {
          return prevItems;
        }
      }

      // Check if item already exists
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity
        };
        return updatedItems;
      } else {
        // Add new item
        setRestaurantId(newRestaurantId);
        setRestaurantName(newRestaurantName);
        return [...prevItems, item];
      }
    });
  };

  const removeItem = (id: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== id);
      
      // Clear restaurant if cart is empty
      if (newItems.length === 0) {
        setRestaurantId(null);
        setRestaurantName(null);
        localStorage.removeItem('cart_restaurant_id');
        localStorage.removeItem('cart_restaurant_name');
      }
      
      return newItems;
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
    setRestaurantName(null);
    localStorage.removeItem('cart');
    localStorage.removeItem('cart_restaurant_id');
    localStorage.removeItem('cart_restaurant_name');
  };

  const updateSpecialInstructions = (id: string, instructions: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, specialInstructions: instructions } : item
      )
    );
  };

  const updateAddons = (id: string, addons: string[]) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, addons } : item
      )
    );
  };

  const getItemCount = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const deliveryFee = 5.99; // Example fixed delivery fee
    const tax = subtotal * 0.1; // 10% tax
    return subtotal + deliveryFee + tax;
  };

  const totalQuantity = getItemCount();
  const totalAmount = getCartTotal();

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        totalAmount,
        restaurantId,
        restaurantName,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        updateSpecialInstructions,
        updateAddons,
        getItemCount,
        getCartSubtotal,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};