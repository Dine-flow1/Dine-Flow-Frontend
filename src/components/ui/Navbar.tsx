"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Button from './Buttons';
import { navigation } from '../../data/navigation';
import UserProfile from './UserProfile'; // We'll create this
import { useAuth } from '../../Context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg sm:w-8 sm:h-8 bg-gradient-to-r from-amber-600 to-amber-400" />
            <span className="font-serif text-xl font-bold sm:text-2xl text-amber-700">DineFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'text-amber-500'
                    : 'text-amber-700 hover:text-amber-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" className="text-amber-600 border-amber-600 hover:bg-amber-50">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 md:hidden">
            {isAuthenticated && (
              <div className="mr-2">
                <UserProfile />
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 transition-colors rounded-lg text-amber-400 hover:bg-amber-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="py-4 border-t border-amber-100 md:hidden bg-white rounded-b-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    pathname === item.href
                      ? 'text-amber-600 bg-amber-50'
                      : 'text-amber-700 hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {!isAuthenticated ? (
                <>
                  <div className="px-4 pt-2">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="outline" className="justify-center w-full text-amber-600 border-amber-600 hover:bg-amber-50">
                        Login
                      </Button>
                    </Link>
                  </div>
                  <div className="px-4">
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="primary" className="justify-center w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="px-4 pt-2 border-t border-amber-100">
                  <div className="py-2">
                    <p className="text-sm font-medium text-amber-700">{currentUser?.fullName}</p>
                    <p className="text-xs text-amber-600">{currentUser?.email}</p>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-amber-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-amber-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      Settings
                    </Link>
                    {currentUser?.role === 'owner' && currentUser?.restaurantId && (
                      <Link
                        href={`/restaurant/${currentUser.restaurantId}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-2 text-sm font-medium text-amber-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        My Restaurant
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;