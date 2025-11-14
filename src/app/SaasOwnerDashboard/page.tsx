"use client";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import StatsCard from '@/src/components/ui/SaasOwner/StatsCard';
import MetricChart from '@/src/components/ui/SaasOwner/Dashboard/MetricChart';
import RecentActivity from '@/src/components/ui/SaasOwner/Dashboard/RecentActivity';
import QuickActions from '@/src/components/ui/SaasOwner/Dashboard/QuickActions';
import Link from 'next/link';

const Dashboard = () => {
  useEffect(() => {
    // Animate stats cards on mount
    gsap.fromTo('.stats-card', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 }
    );
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="p-6 text-white bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl">
        <h1 className="mb-2 text-2xl font-bold">Welcome back, Admin! 👋</h1>
        <p className="text-blue-100">Here's what's happening with your SaaS today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="stats-card">
          <StatsCard
            title="Total Revenue"
            value="$12,426"
            change={12.5}
            trend="up"
            icon="💰"
            color="green"
          />
        </div>
        <div className="stats-card">
          <StatsCard
            title="Active Users"
            value="2,846"
            change={8.2}
            trend="up"
            icon="👥"
            color="blue"
          />
        </div>
        {/* <div className="stats-card">
          <StatsCard
            title="Conversion Rate"
            value="4.8%"
            change={-2.1}
            trend="down"
            icon="📊"
            color="purple"
          />
        </div> */}
        <div className="stats-card">
          <StatsCard
            title="Resturant joined"
            value="38"
            change={-0.5}
            trend="up"
            icon="📊"
            color="orange"
          />
        </div>
      </div>

      {/* Charts and Activity Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <MetricChart />
        </div>
        
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <QuickActions />

      {/* Navigation Cards to other pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/saasownerdashboard/analytics">
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <span className="text-2xl">📈</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">View Detailed Analytics</h3>
                <p className="text-gray-600">Deep dive into your business metrics and performance</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/saasownerdashboard/settings">
          <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <span className="text-2xl">⚙️</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Manage Settings</h3>
                <p className="text-gray-600">Configure your account and application preferences</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;