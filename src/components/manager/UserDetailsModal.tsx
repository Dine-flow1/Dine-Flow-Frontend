import { User } from '../../types/manager';

interface UserDetailsModalProps {
  user: User;
  onClose: () => void;
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export const UserDetailsModal = ({ 
  user, 
  onClose, 
  onBlockUser, 
  onUnblockUser, 
  onDeleteUser 
}: UserDetailsModalProps) => {
  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'premium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">User Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {user.avatar}
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900">{user.name}</h4>
                <p className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status === 'active' ? 'Active' : 'Blocked'}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-900">{user.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Member Since</label>
                <p className="text-gray-900">{user.joinDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Last Login</label>
                <p className="text-gray-900">{user.lastLogin}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">User Statistics</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-semibold">{user.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Spent</span>
                  <span className="font-semibold text-green-600">${user.totalSpent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Order Value</span>
                  <span className="font-semibold">
                    ${user.totalOrders > 0 ? (user.totalSpent / user.totalOrders).toFixed(2) : '0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Role</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-900 mb-3">Quick Actions</h5>
              <div className="flex flex-wrap gap-2">
                {user.status === 'active' ? (
                  <button
                    onClick={() => onBlockUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                  >
                    Block User
                  </button>
                ) : (
                  <button
                    onClick={() => onUnblockUser(user.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    Unblock User
                  </button>
                )}
                <button
                  onClick={() => onDeleteUser(user.id)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  Delete User
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                  View Order History
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};