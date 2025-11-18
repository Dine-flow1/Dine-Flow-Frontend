// src/components/restaurant-owners/RestaurantNavbar.tsx
import Link from 'next/link';

export const RestaurantNavbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">DINERAL</span>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              For Restaurants
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Success Stories</a>
          </div>

          <div className="flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/signUp?type=restaurant" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};