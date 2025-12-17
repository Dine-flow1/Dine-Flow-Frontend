"use client";
import { CartProvider } from "../Context/CartContext";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}