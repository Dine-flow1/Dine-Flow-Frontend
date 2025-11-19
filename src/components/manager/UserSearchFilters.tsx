interface UserSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: 'all' | 'active' | 'blocked';
  onStatusFilterChange: (filter: 'all' | 'active' | 'blocked') => void;
  roleFilter: 'all' | 'customer' | 'vip' | 'premium';
  onRoleFilterChange: (filter: 'all' | 'customer' | 'vip' | 'premium') => void;
}

export const UserSearchFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  roleFilter,
  onRoleFilterChange
}: UserSearchFiltersProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="md:col-span-2">
        <input
          type="text"
          placeholder="Search users by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as any)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="blocked">Blocked</option>
      </select>
      <select
        value={roleFilter}
        onChange={(e) => onRoleFilterChange(e.target.value as any)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="all">All Roles</option>
        <option value="customer">Customer</option>
        <option value="vip">VIP</option>
        <option value="premium">Premium</option>
      </select>
    </div>
  );
};