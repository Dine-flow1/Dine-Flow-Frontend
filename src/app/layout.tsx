import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DineFlow - Sign In',
  description: 'Authentication page for DineFlow restaurant management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}