'use client';
import { useState } from 'react';

export const ManagerNavbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">DineFlow</span>
            <span className="ml-2 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
              Manager Dashboard
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#overview" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Overview</a>
            <a href="#menu" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Menu</a>
            <a href="#tables" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Tables</a>
            <a href="#users" className="text-gray-600 hover:text-green-600 transition-colors font-medium">Users</a>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-600 hover:text-green-600 transition-colors">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <span className="hidden md:block font-medium">Manager</span>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">Profile Settings</a>
                  <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">Restaurant Settings</a>
                  <div className="border-t border-gray-200 my-1"></div>
                  <a href="/login" className="block px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors">Logout</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};