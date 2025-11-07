"use client";
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  action: () => void;
  badge?: string;
}

const QuickActions = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const quickActions: ActionItem[] = [
    {
      id: '1',
      title: 'Add User',
      description: 'Create new user account',
      icon: '👥',
      color: 'from-blue-500 to-blue-600',
      action: () => alert('Add User clicked')
    },
    {
      id: '2',
      title: 'Generate Report',
      description: 'Create analytics report',
      icon: '📊',
      color: 'from-green-500 to-green-600',
      action: () => alert('Generate Report clicked')
    },
    {
      id: '3',
      title: 'Send Notification',
      description: 'Notify all users',
      icon: '🔔',
      color: 'from-purple-500 to-purple-600',
      action: () => alert('Send Notification clicked'),
      badge: 'New'
    },
    {
      id: '4',
      title: 'System Settings',
      description: 'Configure system preferences',
      icon: '⚙️',
      color: 'from-gray-500 to-gray-600',
      action: () => alert('System Settings clicked')
    },
    {
      id: '5',
      title: 'Billing',
      description: 'Manage subscriptions & payments',
      icon: '💳',
      color: 'from-amber-500 to-amber-600',
      action: () => alert('Billing clicked')
    },
    {
      id: '6',
      title: 'API Keys',
      description: 'Manage integration keys',
      icon: '🔑',
      color: 'from-red-500 to-red-600',
      action: () => alert('API Keys clicked')
    }
  ];

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo('.action-card',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, delay: 0.5 }
      );
    }
  }, []);

  const handleActionClick = (action: ActionItem) => {
    // Add click animation
    gsap.to(`#action-${action.id}`, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      onComplete: action.action
    });
  };

  return (
    <div ref={containerRef} className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <p className="text-sm text-gray-600">Frequently used actions</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 text-sm text-gray-500 transition-colors duration-200 rounded-lg hover:text-gray-700 hover:bg-gray-100">
            ⚙️
          </button>
          <button className="p-2 text-sm text-gray-500 transition-colors duration-200 rounded-lg hover:text-gray-700 hover:bg-gray-100">
            🔄
          </button>
        </div>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <button
            key={action.id}
            id={`action-${action.id}`}
            onClick={() => handleActionClick(action)}
            className="p-4 text-left transition-all duration-200 bg-white border border-gray-200 action-card group rounded-xl hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30"
          >
            {/* Icon with gradient background */}
            <div className={`w-12 h-12 rounded-xl bg-linear-to-r ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-200`}>
              <span className="text-lg text-white">{action.icon}</span>
            </div>

            {/* Badge */}
            {action.badge && (
              <div className="inline-block px-2 py-1 mb-2 text-xs font-medium text-red-700 bg-red-100 rounded-full">
                {action.badge}
              </div>
            )}

            {/* Content */}
            <div>
              <h4 className="mb-1 text-sm font-semibold text-gray-900 transition-colors duration-200 group-hover:text-blue-600">
                {action.title}
              </h4>
              <p className="text-xs leading-relaxed text-gray-600">
                {action.description}
              </p>
            </div>

            {/* Hover arrow */}
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-gray-400 transition-colors duration-200 group-hover:text-blue-500">
                Click to execute
              </span>
              <div className="transition-all duration-200 transform opacity-0 group-hover:opacity-100 group-hover:translate-x-1">
                <span className="text-blue-500">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Actions */}
      <div className="pt-6 mt-8 border-t border-gray-200">
        <h4 className="mb-4 text-sm font-semibold text-gray-900">Recently Used</h4>
        <div className="flex flex-wrap gap-2">
          {quickActions.slice(0, 3).map((action) => (
            <button
              key={action.id}
              className="flex items-center px-3 py-2 space-x-2 text-xs text-gray-700 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <span>{action.icon}</span>
              <span>{action.title}</span>
            </button>
          ))}
          <button className="px-3 py-2 text-xs font-medium text-blue-600 hover:text-blue-700">
            View History →
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="pt-6 mt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-500">Actions Today</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">89</div>
            <div className="text-xs text-gray-500">This Week</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">342</div>
            <div className="text-xs text-gray-500">This Month</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;