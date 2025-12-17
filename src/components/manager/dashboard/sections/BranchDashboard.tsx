'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { Store, Users, TrendingUp, Clock, DollarSign, Package, Star, AlertCircle } from 'lucide-react';

export function BranchDashboard() {
  const [branchData, setBranchData] = useState({
    name: 'Downtown Main Branch',
    address: '123 Main Street, New York, NY 10001',
    status: 'open',
    openingHours: '9:00 AM - 11:00 PM',
    manager: 'John Manager',
    contact: '+1 (212) 555-0100',
  });

  const [todaysStats, setTodaysStats] = useState({
    revenue: 2850,
    orders: 42,
    customers: 128,
    avgWaitTime: 15,
    occupancy: 67,
    rating: 4.5,
  });

  const [staffOnDuty, setStaffOnDuty] = useState([
    { name: 'John (Chef)', role: 'Head Chef', status: 'active' },
    { name: 'Sarah (Server)', role: 'Waitress', status: 'break' },
    { name: 'Mike (Bartender)', role: 'Bartender', status: 'active' },
    { name: 'Emma (Host)', role: 'Host', status: 'active' },
    { name: 'Alex (Manager)', role: 'Assistant Manager', status: 'active' },
  ]);

  const [alerts, setAlerts] = useState([
    { id: 1, message: 'Table 7 needs attention', time: '5 min ago', priority: 'high' },
    { id: 2, message: 'Inventory low: Chicken', time: '1 hour ago', priority: 'medium' },
    { id: 3, message: 'AC temperature high', time: '2 hours ago', priority: 'low' },
  ]);

  useEffect(() => {
    gsap.from('.stat-card', {
      duration: 0.6,
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const stats = [
    {
      title: 'Today\'s Revenue',
      value: `$${todaysStats.revenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: todaysStats.orders.toString(),
      change: '+8 orders',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Customers Today',
      value: todaysStats.customers.toString(),
      change: '+15%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Avg. Wait Time',
      value: `${todaysStats.avgWaitTime} min`,
      change: '-3 min',
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Table Occupancy',
      value: `${todaysStats.occupancy}%`,
      change: '+5%',
      icon: Store,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Customer Rating',
      value: todaysStats.rating.toFixed(1),
      change: '+0.2',
      icon: Star,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Branch Dashboard</h1>
            <p className="text-gray-600">{branchData.name} • {branchData.address}</p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                Currently Open
              </span>
              <span className="text-sm text-gray-600">{branchData.openingHours}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">Managed by: {branchData.manager}</p>
            <p className="text-sm text-gray-600">{branchData.contact}</p>
          </div>
        </div>
      </div>

      {/* Branch Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card bg-white rounded-xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
              <p className={`text-2xl font-bold ${stat.color} mt-2`}>{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff On Duty */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              Staff On Duty
            </h3>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {staffOnDuty.length} Staff
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
                    <p className="text-sm text-gray-500">{staff.role}</p>
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

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Next Shift Change</p>
                <p className="font-bold text-gray-800">4:00 PM</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Staff Needed</p>
                <p className="font-bold text-red-600">2 More</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts & Notifications */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              Alerts & Notifications
            </h3>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
              {alerts.length} Active
            </span>
          </div>

          <div className="space-y-4">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-4 rounded-lg border ${
                alert.priority === 'high' ? 'bg-red-50 border-red-200' :
                alert.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <div className={`mt-1 h-3 w-3 rounded-full ${
                      alert.priority === 'high' ? 'bg-red-500' :
                      alert.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-800">{alert.message}</p>
                      <p className="text-sm text-gray-600 mt-1">{alert.time}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-white border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                    Resolve
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold mb-4">Quick Status Update</h4>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                Mark Branch Open
              </button>
              <button className="p-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors">
                Mark Branch Closed
              </button>
              <button className="p-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                Update Inventory
              </button>
              <button className="p-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-6">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Peak Hours</p>
            <p className="text-2xl font-bold text-gray-800">12-2 PM</p>
            <p className="text-sm text-gray-600 mt-2">7-9 PM</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Best Selling Item</p>
            <p className="text-2xl font-bold text-gray-800">Grilled Salmon</p>
            <p className="text-sm text-gray-600 mt-2">42 sold today</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Customer Satisfaction</p>
            <p className="text-2xl font-bold text-gray-800">92%</p>
            <p className="text-sm text-gray-600 mt-2">Based on 28 reviews</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Food Cost</p>
            <p className="text-2xl font-bold text-gray-800">28%</p>
            <p className="text-sm text-gray-600 mt-2">Within target range</p>
          </div>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Operations Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold mb-3">Equipment Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Kitchen Equipment</span>
                <span className="font-medium text-green-600">All Operational</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">AC System</span>
                <span className="font-medium text-yellow-600">Needs Check</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">POS System</span>
                <span className="font-medium text-green-600">Online</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold mb-3">Supply Status</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Food Supplies</span>
                <span className="font-medium text-green-600">Adequate</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cleaning Supplies</span>
                <span className="font-medium text-yellow-600">Low</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Beverages</span>
                <span className="font-medium text-green-600">Stocked</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-semibold mb-3">Safety & Compliance</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fire Safety</span>
                <span className="font-medium text-green-600">Compliant</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Health Inspection</span>
                <span className="font-medium text-green-600">Passed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Staff Training</span>
                <span className="font-medium text-yellow-600">Needs Update</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}