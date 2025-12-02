import Link from "next/link";
import { RestaurantOwnerStats } from "../../types/restaurant-owner";

interface Props {
  stats: RestaurantOwnerStats;
}

export default function HeroContent({ stats }: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Grow Your Restaurant
          <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {" "}Business
          </span>
        </h1>
        <p className="text-xl text-gray-600 mt-6 leading-relaxed">
          Join thousands of successful restaurants using DineFlow to increase revenue,
          streamline operations, and build lasting customer relationships.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/signUp?type=restaurant"
          className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-center"
        >
          Start Free Trial - 30 Days
        </Link>
        <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 transition-all duration-200">
          Watch Demo
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
        <StatCard label="Orders" value={`${stats.totalOrders}+`} />
        <StatCard label="Monthly Revenue" value={`$${(stats.monthlyRevenue / 1000).toFixed(0)}K+`} />
        <StatCard label="Customers" value={`${stats.activeCustomers}+`} />
        <StatCard label="Rating" value={`${stats.rating}/5`} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}
