"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ActivityItem {
  id: string;
  type: 'user' | 'payment' | 'system' | 'update';
  title: string;
  description: string;
  time: string;
  user?: string;
  amount?: number;
}

const RecentActivity = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'user',
      title: 'New user registered',
      description: 'Sarah Johnson joined your platform',
      time: '2 min ago',
      user: 'Sarah J.'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment received',
      description: 'Monthly subscription payment',
      time: '1 hour ago',
      amount: 99.99
    },
    {
      id: '3',
      type: 'system',
      title: 'System update',
      description: 'Automated backup completed',
      time: '3 hours ago'
    },
    {
      id: '4',
      type: 'update',
      title: 'Feature update',
      description: 'New analytics dashboard deployed',
      time: '5 hours ago'
    },
    {
      id: '5',
      type: 'payment',
      title: 'Payment failed',
      description: 'Failed to process subscription',
      time: '1 day ago',
      amount: 49.99
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo('.activity-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, delay: 0.4 }
      );
    }
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return '👤';
      case 'payment': return '💳';
      case 'system': return '⚙️';
      case 'update': return '🔄';
      default: return '📢';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'user': return 'bg-green-100 text-green-600';
      case 'payment': return 'bg-blue-100 text-blue-600';
      case 'system': return 'bg-gray-100 text-gray-600';
      case 'update': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div ref={containerRef} className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <p className="text-sm text-gray-600">Latest system events</p>
        </div>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View All
        </button>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start p-3 space-x-3 transition-colors duration-200 rounded-lg activity-item hover:bg-gray-50 group"
          >
            {/* Icon */}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getActivityColor(activity.type)}`}>
              <span className="text-sm">{getActivityIcon(activity.type)}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {activity.description}
                  </p>
                </div>
                <span className="ml-2 text-xs text-gray-500 whitespace-nowrap">
                  {activity.time}
                </span>
              </div>

              {/* Additional info */}
              <div className="flex items-center mt-2 space-x-4">
                {activity.user && (
                  <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
                    {activity.user}
                  </span>
                )}
                {activity.amount && (
                  <span className={`text-xs font-medium px-2 py-1 rounded ${
                    activity.title.includes('failed') 
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    ${activity.amount}
                  </span>
                )}
              </div>
            </div>

            {/* Hover indicator */}
            <div className="transition-opacity duration-200 opacity-0 group-hover:opacity-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state (commented for reference)
      <div className="py-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
          <span className="text-2xl">📊</span>
        </div>
        <p className="text-sm text-gray-500">No recent activity</p>
      </div>
      */}

      {/* Footer */}
      <div className="pt-4 mt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Last updated: Just now</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-600">System active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;