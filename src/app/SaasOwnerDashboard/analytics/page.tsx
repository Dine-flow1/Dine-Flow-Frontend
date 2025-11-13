"use client";
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

// Mock data - replace with actual API calls
const analyticsData = {
  totalUsers: 2846,
  totalRestaurants: 156,
  activeSubscriptions: 238,
  revenue: 12426,
  userGrowth: [1200, 1400, 1600, 1800, 2000, 2200, 2400, 2846],
  revenueData: [8000, 9000, 9500, 11000, 10500, 11500, 12000, 12426]
};

export default function AnalyticsPage() {
  const analyticsRef = useRef<HTMLDivElement>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    if (analyticsRef.current) {
      gsap.fromTo(analyticsRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div ref={analyticsRef} className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of your platform performance</p>
        </div>
        <Link 
          href="/saasownerdashboard"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <span>←</span>
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Time Range Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex space-x-2">
          {(['week', 'month', 'year'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-blue-800">Total Users</h3>
              <p className="text-3xl font-bold text-blue-600">{analyticsData.totalUsers.toLocaleString()}</p>
            </div>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-sm text-blue-600 mt-2">+12% from last month</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-green-800">Restaurants</h3>
              <p className="text-3xl font-bold text-green-600">{analyticsData.totalRestaurants}</p>
            </div>
            <span className="text-2xl">🏪</span>
          </div>
          <p className="text-sm text-green-600 mt-2">+8% from last month</p>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-800">Subscriptions</h3>
              <p className="text-3xl font-bold text-purple-600">{analyticsData.activeSubscriptions}</p>
            </div>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-sm text-purple-600 mt-2">+15% from last month</p>
        </div>
        
        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-orange-800">Revenue</h3>
              <p className="text-3xl font-bold text-orange-600">${analyticsData.revenue.toLocaleString()}</p>
            </div>
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-sm text-orange-600 mt-2">+18% from last month</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">User Growth</h3>
          <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-gray-100 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl mb-2">📊</span>
              <p className="text-gray-600">User Growth Chart</p>
              <p className="text-sm text-gray-500">Active users over time</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Revenue Trend</h3>
          <div className="h-64 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-gray-100 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl mb-2">💹</span>
              <p className="text-gray-600">Revenue Chart</p>
              <p className="text-sm text-gray-500">Monthly revenue progression</p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Conversion Rate</h4>
          <p className="text-2xl font-bold text-green-600">4.8%</p>
          <p className="text-sm text-gray-600">Overall platform conversion</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Avg. Session</h4>
          <p className="text-2xl font-bold text-blue-600">8.2m</p>
          <p className="text-sm text-gray-600">Average user session duration</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-2">Resturant</h4>
          <p className="text-2xl font-bold text-red-600">1.2%</p>
          <p className="text-sm text-gray-600">Total Number Of resturant</p>
        </div>
      </div>
    </div>
  );
}