import type { User } from '../types/user';

interface UsersStatsProps {
  users: User[];
}

export default function UsersStats({ users }: UsersStatsProps) {
  const stats = [
    { label: 'Total Users', value: users.length, color: 'blue', icon: '👥' },
    { label: 'Active Users', value: users.filter(u => u.status === 'active').length, color: 'green', icon: '✅' },
    { label: 'Restaurant Owners', value: users.filter(u => u.role === 'restaurant_owner').length, color: 'purple', icon: '🏪' },
    { label: 'Blocked Users', value: users.filter(u => u.status === 'blocked').length, color: 'red', icon: '🚫' }
  ];

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    red: 'text-red-600'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{stat.label}</h3>
              <p className={`text-3xl font-bold ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                {stat.value}
              </p>
            </div>
            <span className="text-2xl">{stat.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}