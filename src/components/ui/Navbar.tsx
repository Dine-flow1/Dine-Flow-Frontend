'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Helper function to handle navigation and close mobile menu
  const handleNavigation = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md border-gold-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-linear-to-br from-gold-500 to-wine-600">
              <span className="text-lg font-bold text-white">🍽️</span>
            </div>
            <span className="text-xl font-bold text-foreground">RestroHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="items-center hidden gap-8 md:flex">
            <Link 
              href="/hotels" 
              className="font-medium transition-colors text-foreground hover:text-gold-600"
            >
              Hotels
            </Link>
            <Link 
              href="/order" 
              className="font-medium transition-colors text-foreground hover:text-gold-600"
            >
              Order
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="items-center hidden gap-4 md:flex">
            <Link 
              href="/login" 
              className="px-6 py-2 font-semibold transition-colors border-2 rounded-lg text-gold-700 border-gold-500 hover:bg-gold-50"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="btn-primary"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 transition-colors rounded-lg md:hidden hover:bg-gold-100"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="pb-6 space-y-4 md:hidden animate-slide-up">
            <button 
              onClick={() => handleNavigation("/hotels")} 
              className="block w-full font-medium text-left transition-colors text-foreground hover:text-gold-600"
            >
              Hotels
            </button>
            <button 
              onClick={() => handleNavigation("/order")} 
              className="block w-full font-medium text-left transition-colors text-foreground hover:text-gold-600"
            >
              Order
            </button>
            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => handleNavigation("/login")} 
                className="flex-1 px-4 py-2 text-sm font-semibold transition-colors border-2 rounded-lg text-gold-700 border-gold-500 hover:bg-gold-50"
              >
                Login
              </button>
              <button 
                onClick={() => handleNavigation("/resigter")} 
                className="flex-1 text-sm btn-primary bg-amber-300"
                
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}