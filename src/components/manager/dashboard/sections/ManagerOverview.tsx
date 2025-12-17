'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Clock, Users, ShoppingBag, TrendingUp, AlertCircle, ChefHat, Table } from 'lucide-react';

export function ManagerOverview() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (statsRef.current) {
      gsap.from('.overview-card', {
        duration: 0.6,
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }
  }, []);

  const todaysMetrics = [
    {
      title: 'Orders Today',
      value: '42',
      change: '+18%',
      icon: ShoppingBag,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Active Tables',
      value: '8/12',
      change: '67% full',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg. Wait Time',
      value: '15 min',
      change: '-5 min',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Today\'s Revenue',
      value: '$2,850',
      change: '+12%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
  ];

  const urgentTasks = [
    { id: 1, task: 'Table 7 needs attention', time: '5 min ago', priority: 'high' },
    { id: 2, task: 'Order #124 delayed', time: '10 min ago', priority: 'medium' },
    { id: 3, task: 'Inventory low: Chicken', time: '15 min ago', priority: 'high' },
    { id: 4, task: 'Staff break rotation', time: '20 min ago', priority: 'low' },
  ];

  const staffOnDuty = [
    { name: 'John (Chef)', status: 'active', shift: 'Morning (8AM-4PM)' },
    { name: 'Sarah (Server)', status: 'break', shift: 'Morning (8AM-4PM)' },
    { name: 'Mike (Bartender)', status: 'active', shift: 'Evening (4PM-12AM)' },
    { name: 'Emma (Host)', status: 'active', shift: 'Morning (8AM-4PM)' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Daily Operations Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening in your restaurant today.</p>
      </div>

      <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {todaysMetrics.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="overview-card bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                  <p className={`text-sm ${stat.color} mt-1`}>{stat.change}</p>
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
        {/* Urgent Tasks */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              Urgent Tasks & Alerts
            </h3>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              4 Pending
            </span>
          </div>
          <div className="space-y-4">
            {urgentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`h-3 w-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium">{task.task}</p>
                    <p className="text-sm text-gray-500">{task.time}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Resolve
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Staff On Duty */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <ChefHat className="h-5 w-5 text-blue-600 mr-2" />
              Staff On Duty
            </h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {staffOnDuty.length} Active
            </span>
          </div>
          <div className="space-y-4">
            {staffOnDuty.map((staff, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    staff.status === 'active' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <span className={`font-semibold ${
                      staff.status === 'active' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {staff.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{staff.name}</p>
                    <p className="text-sm text-gray-500">{staff.shift}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`h-2 w-2 rounded-full ${
                    staff.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="text-sm text-gray-600 capitalize">{staff.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-green-50 text-green-700 rounded-lg flex flex-col items-center justify-center hover:bg-green-100 transition-colors">
            <ShoppingBag className="h-6 w-6 mb-2" />
            <span className="font-medium">New Order</span>
          </button>
          <button className="p-4 bg-blue-50 text-blue-700 rounded-lg flex flex-col items-center justify-center hover:bg-blue-100 transition-colors">
            <Table className="h-6 w-6 mb-2" />
            <span className="font-medium">Manage Tables</span>
          </button>
          <button className="p-4 bg-yellow-50 text-yellow-700 rounded-lg flex flex-col items-center justify-center hover:bg-yellow-100 transition-colors">
            <Users className="h-6 w-6 mb-2" />
            <span className="font-medium">Staff Schedule</span>
          </button>
          <button className="p-4 bg-purple-50 text-purple-700 rounded-lg flex flex-col items-center justify-center hover:bg-purple-100 transition-colors">
            <AlertCircle className="h-6 w-6 mb-2" />
            <span className="font-medium">Issue Report</span>
          </button>
        </div>
      </div>
    </div>
  );
}