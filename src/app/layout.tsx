import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/Context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

// ✅ Correct: Separate metadata export
export const metadata: Metadata = {
  title: 'DineFlow - Restaurant Management',
  description: 'Modern restaurant management and food ordering platform',
  icons: {
    icon: '/favicon.ico',
  },
}

// ✅ Correct: Separate viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          
        
        {children}
        </AuthProvider>
      </body>
    </html>
  )
}