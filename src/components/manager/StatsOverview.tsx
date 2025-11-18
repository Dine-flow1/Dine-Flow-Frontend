// src/components/manager/StatsOverview.tsx
import { DashboardStats } from '../../types/manager';

interface StatsOverviewProps {
  stats: DashboardStats;
}

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  const statCards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: '💰',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.monthlyRevenue.toLocaleString()}`,
      change: '+8.2%',
      trend: 'up',
      icon: '📈',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: "Today's Revenue",
      value: `$${stats.dailyRevenue.toLocaleString()}`,
      change: '+15.3%',
      trend: 'up',
      icon: '🕒',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders.toString(),
      change: '-2.1%',
      trend: 'down',
      icon: '📦',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className={`${stat.color} border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <div className={`flex items-center mt-2 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span className="mr-1">{stat.trend === 'up' ? '↗' : '↘'}</span>
                {stat.change} from yesterday
              </div>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};