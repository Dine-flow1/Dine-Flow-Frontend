// src/components/restaurant-owners/HeroSection.tsx
import Link from 'next/link';
import { RestaurantOwnerStats } from '../../types/restaurant-owner';

interface HeroSectionProps {
  stats: RestaurantOwnerStats;
}

export const HeroSection = ({ stats }: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Grow Your Restaurant
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}Business
                </span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Join thousands of successful restaurants using DINEFLOW to increase revenue, 
                streamline operations, and build lasting customer relationships.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signUp?type=restaurant"
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-center"
              >
                Start Free Trial - 30 Days
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
                Watch Demo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.totalOrders}+</div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">${(stats.monthlyRevenue / 1000).toFixed(0)}K+</div>
                <div className="text-sm text-gray-600">Monthly Revenue</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.activeCustomers}+</div>
                <div className="text-sm text-gray-600">Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{stats.rating}/5</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
            </div>
          </div>

          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};

const DashboardPreview = () => {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl p-8 shadow-2xl border border-gray-100">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Restaurant Dashboard</h3>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600">42</div>
              <div className="text-sm text-blue-800">Today's Orders</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600">$1,248</div>
              <div className="text-sm text-green-800">Revenue</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pending Orders</span>
              <span className="font-semibold">8</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Completed Today</span>
              <span className="font-semibold">34</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Customer Rating</span>
              <span className="font-semibold">4.8/5</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
        +300% Growth
      </div>
      <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
        98% Happy Owners
      </div>
    </div>
  );
};