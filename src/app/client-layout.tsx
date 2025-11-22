// src/app/client-layout.tsx
"use client";

import { AuthProvider } from '../Context/AuthContext';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}