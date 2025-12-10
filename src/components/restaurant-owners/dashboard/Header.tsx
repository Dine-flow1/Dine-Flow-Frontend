"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Bell, Search } from "lucide-react";
import UserProfile from "../../ui/UserProfile";
import { useAuth } from "../../../Context/AuthContext";

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const { currentUser, isAuthenticated } = useAuth();

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        duration: 0.8,
        opacity: 1,
        y: -20,
        ease: "power3.out",
      });
    }
  }, []);

  return (
    <header
      ref={headerRef}
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="search"
              placeholder="Search dashboard..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Side: Notifications & User Profile */}
        <div className="flex items-center space-x-6">
          {/* Notifications Bell */}
          <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 group">
            <Bell className="h-6 w-6 text-gray-600 group-hover:text-amber-600" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {/* User Profile Component */}
          {isAuthenticated ? (
            <UserProfile className="border-l border-gray-200 pl-6" />
          ) : (
            <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
              <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">?</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-700">Guest</p>
                <p className="text-xs text-gray-500">Not logged in</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}