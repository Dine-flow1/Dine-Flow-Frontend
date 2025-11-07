import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  icon: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const StatsCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon,
  color = 'blue' 
}: StatsCardProps) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  };

  const trendColors = {
    up: 'text-green-600 bg-green-100',
    down: 'text-red-600 bg-red-100'
  };

  return (
    <div className="p-6 transition-shadow duration-200 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-1 text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          
          {change !== undefined && trend && (
            <div className="flex items-center mt-2">
              <span className={clsx(
                "text-xs font-medium px-2 py-1 rounded-full",
                trendColors[trend]
              )}>
                {trend === 'up' ? '↗' : '↘'} {Math.abs(change)}%
              </span>
              <span className="ml-2 text-xs text-gray-500">from last month</span>
            </div>
          )}
        </div>
        
        <div className={clsx(
          "w-12 h-12 rounded-lg bg-linear-to-r flex items-center justify-center",
          colorClasses[color]
        )}>
          <span className="text-xl text-white">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;