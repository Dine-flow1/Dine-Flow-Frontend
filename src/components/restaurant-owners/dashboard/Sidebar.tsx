'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  UtensilsCrossed,
  Store,
  TrendingUp,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  CreditCard
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: any) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  activeSection,
  onSectionChange,
  collapsed,
  onToggleCollapse
}: SidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [hasActiveSubscription, setHasActiveSubscription] = useState<boolean | null>(null);

  // 🔹 Fetch subscription status
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      try {
        const res = await axios.get(
          'http://localhost:9999/api/subscription/status',
          { withCredentials: true }
        );
        setHasActiveSubscription(res.data.hasActiveSubscription);
      } catch (error) {
        console.error('Failed to fetch subscription status', error);
        setHasActiveSubscription(false);
      }
    };

    fetchSubscriptionStatus();
  }, []);

  // 🔹 GSAP animation
  useEffect(() => {
    if (sidebarRef.current) {
      gsap.from(sidebarRef.current, {
        duration: 0.6,
        opacity: 1,
        ease: 'power3.out'
      });
    }
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'managers', label: 'Manage Managers', icon: Users },
    { id: 'verifications', label: 'Approved Verification', icon: CheckSquare },
    { id: 'menu', label: 'Full Menu Controller', icon: UtensilsCrossed },
    { id: 'branches', label: 'Branch Controller', icon: Store },
    { id: 'finance', label: 'Financial Dashboard', icon: TrendingUp },
    { id: 'staff', label: 'Staff Management', icon: Briefcase },
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`bg-white shadow-lg h-[calc(100vh-4rem)] fixed top-16 left-0 z-10 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 bg-white border border-gray-300 rounded-full p-1 shadow-md hover:bg-gray-50"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      <nav className="p-4">
        <div className={`mb-8 ${collapsed ? 'px-2' : 'px-4'}`}>
          {!collapsed && (
            <>
              <h2 className="text-lg font-bold text-gray-800">DineFlow Restaurants</h2>
              <p className="text-sm text-gray-500">Management Dashboard</p>
            </>
          )}
        </div>

        <ul className="space-y-2">
          {/* Normal menu items */}
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center ${
                    collapsed ? 'justify-center p-3' : 'px-4 py-3'
                  } rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </button>
              </li>
            );
          })}

          {/* 🔥 Subscription button (ONLY if NOT subscribed) */}
          {hasActiveSubscription === false && (
            <li>
              <button
                onClick={() => router.push('/subscription')}
                className={`w-full flex items-center ${
                  collapsed ? 'justify-center p-3' : 'px-4 py-3'
                } rounded-lg transition-all text-orange-600 hover:bg-orange-50`}
              >
                <CreditCard className="h-5 w-5" />
                {!collapsed && <span className="ml-3 font-medium">Subscription</span>}
              </button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}
