interface UsersFiltersProps {
  filter: 'all' | 'active' | 'blocked';
  setFilter: (filter: 'all' | 'active' | 'blocked') => void;
  roleFilter: 'all' | 'customer' | 'restaurant_owner' | 'manager' | 'delivery';
  setRoleFilter: (role: 'all' | 'customer' | 'restaurant_owner' | 'manager' | 'delivery') => void;
}

export default function UsersFilters({ filter, setFilter, roleFilter, setRoleFilter }: UsersFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Role Filter</label>
          <select 
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customers</option>
            <option value="restaurant_owner">Restaurant Owners</option>
            <option value="manager">Managers</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input 
            type="text"
            placeholder="Search users..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
}