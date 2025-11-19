import { User } from '../../types/manager';

interface UsersTableProps {
  users: User[];
  onViewDetails: (user: User) => void;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export const UsersTable = ({ 
  users, 
  onViewDetails, 
  onBlockUser, 
  onUnblockUser, 
  onDeleteUser 
}: UsersTableProps) => {
  const getStatusColor = (status: User['status']) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-4 py-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {user.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-medium text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">Joined {user.joinDate}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="text-sm text-gray-900">{user.email}</div>
                <div className="text-sm text-gray-500">{user.phone}</div>
              </td>
              <td className="px-4 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                  {user.status === 'active' ? 'Active' : 'Blocked'}
                </span>
              </td>
              <td className="px-4 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">
                {user.totalOrders} orders
              </td>
              <td className="px-4 py-4 text-sm font-semibold text-green-600">
                ${user.totalSpent.toLocaleString()}
              </td>
              <td className="px-4 py-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onViewDetails(user)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    Details
                  </button>
                  {user.status === 'active' ? (
                    <button
                      onClick={() => onBlockUser(user.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => onUnblockUser(user.id)}
                      className="text-green-600 hover:text-green-800 text-sm font-medium transition-colors"
                    >
                      Unblock
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteUser(user.id)}
                    className="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {users.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No users found matching your criteria.
        </div>
      )}
    </div>
  );
};