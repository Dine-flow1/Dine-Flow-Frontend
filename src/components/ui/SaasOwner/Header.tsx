"use client";
import { useState } from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-100 lg:hidden"
          >
            <span className="text-2xl">☰</span>
          </button>
          
          {/* Breadcrumb */}
          <div className="hidden sm:ml-4 sm:flex sm:items-center">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-900 hover:bg-gray-100">
            <span className="text-xl">🔔</span>
            <span className="absolute w-2 h-2 bg-red-500 rounded-full top-2 right-2"></span>
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center p-2 space-x-3 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-r from-blue-500 to-purple-600">
                <span className="text-sm font-semibold text-white">A</span>
              </div>
              <div className="hidden text-left md:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Owner</p>
              </div>
            </button>

            {/* Dropdown menu */}
            {isProfileOpen && (
              <div className="absolute right-0 z-40 w-48 py-1 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  👤 Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  ⚙️ Settings
                </a>
                <div className="my-1 border-t border-gray-200"></div>
                <a href="/logout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  🚪 Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;