'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Bell, Search, User, Clock, LogOut } from 'lucide-react';

interface ManagerHeaderProps {
  onLogout: () => void;
}

export default function ManagerHeader({ onLogout }: ManagerHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        duration: 0.8,
        y: -50,
        opacity: 0,
        ease: 'power3.out'
      });
    }

    // Update time every minute
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    
    updateTime();
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header 
      ref={headerRef}
      className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Manager Dashboard</p>
              <p className="text-sm text-gray-500 flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {currentTime}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm font-medium">Downtown Branch</span>
              <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold">John Manager</p>
                <p className="text-xs text-gray-500">Restaurant Manager</p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}