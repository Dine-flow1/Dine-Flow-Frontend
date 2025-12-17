// src/components/cart/CartWithProvider.tsx
'use client';
import { CartProvider } from '../../Context/CartContext';
import { Cart } from '../ui/Cart';

export const CartWithProvider = () => {
  return (
    <CartProvider>
      <Cart />
    </CartProvider>
  );
};