'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TrendingUp, Users, DollarSign, CheckCircle } from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Active Managers',
    value: '12',
    change: '+2',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Pending Verifications',
    value: '5',
    change: '-3',
    icon: CheckCircle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    title: 'Total Orders',
    value: '1,234',
    change: '+18.2%',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
];

export function Overview() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsRef.current) {
      gsap.from('.stat-card', {
        duration: 0.6,
        y: 30,
        opacity: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your restaurant today.</p>
      </div>

      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  <p className={`text-sm ${stat.color} mt-1`}>{stat.change} from last month</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {[
              { action: 'New menu item added', time: '2 minutes ago', user: 'John Doe' },
              { action: 'Manager approved', time: '1 hour ago', user: 'Sarah Smith' },
              { action: 'Order #1234 completed', time: '2 hours ago', user: 'System' },
              { action: 'New branch registered', time: '1 day ago', user: 'Alex Johnson' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time} by {activity.user}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Add Menu Item', color: 'bg-blue-500 hover:bg-blue-600' },
              { label: 'Approve Request', color: 'bg-green-500 hover:bg-green-600' },
              { label: 'View Reports', color: 'bg-purple-500 hover:bg-purple-600' },
              { label: 'Manage Staff', color: 'bg-yellow-500 hover:bg-yellow-600' },
            ].map((action, index) => (
              <button
                key={index}
                className={`${action.color} text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105`}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}