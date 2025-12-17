'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Table,
  Store,
  Users,
  Package,
  BarChart3,
  ChefHat,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface ManagerSidebarProps {
  activeSection: string;
  onSectionChange: (section: any) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

const menuItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard, color: 'text-blue-600' },
  { id: 'orders', label: 'Order Management', icon: ShoppingBag, color: 'text-green-600' },
  { id: 'menu', label: 'Menu Updates', icon: UtensilsCrossed, color: 'text-yellow-600' },
  { id: 'tables', label: 'Table Management', icon: Table, color: 'text-purple-600' },
  { id: 'branch', label: 'Branch Dashboard', icon: Store, color: 'text-red-600' },
  { id: 'customers', label: 'Customer Interaction', icon: MessageSquare, color: 'text-pink-600' },
  { id: 'inventory', label: 'Inventory Management', icon: Package, color: 'text-indigo-600' },
  { id: 'staff', label: 'Staff Management', icon: ChefHat, color: 'text-orange-600' },
];

export default function ManagerSidebar({ 
  activeSection, 
  onSectionChange, 
  collapsed, 
  onToggleCollapse 
}: ManagerSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sidebarRef.current) {
      gsap.from(sidebarRef.current, {
        duration: 0.6,
        x: -100,
        opacity: 0,
        ease: 'power3.out'
      });
    }
  }, []);

  return (
    <aside
      ref={sidebarRef}
      className={`bg-white shadow-lg h-[calc(100vh-4rem)] fixed top-16 left-0 z-10 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>

      <nav className="p-4">
        <div className={`mb-8 ${collapsed ? 'px-2' : 'px-4'}`}>
          {!collapsed && (
            <div className="animate-fadeIn">
              <h2 className="text-lg font-bold text-gray-800">Operations Hub</h2>
              <p className="text-sm text-gray-500">Daily Management</p>
            </div>
          )}
        </div>

        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center ${
                    collapsed ? 'justify-center p-3' : 'px-4 py-3'
                  } rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? item.color : 'text-gray-400'}`} />
                  {!collapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {!collapsed && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Quick Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Today's Orders</span>
                <span className="font-semibold">42</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tables Occupied</span>
                <span className="font-semibold">8/12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Staff On Duty</span>
                <span className="font-semibold">6</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
}