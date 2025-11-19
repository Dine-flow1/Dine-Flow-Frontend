"use client"
import type { User } from '../types/user';

interface UserModalProps {
  user: User | null;
  onClose: () => void;
  onToggleStatus: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
}

export default function UserModal({ user, onClose, onToggleStatus, onDeleteUser }: UserModalProps) {
  if (!user) return null;

  const deleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      onDeleteUser(userId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0  bg-amber-200-transparent bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-blue-50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">User Details</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xl font-semibold">{user.name.charAt(0)}</span>
              </div>
              <div>
                <h4 className="text-xl font-semibold">{user.name}</h4>
                <p className="text-gray-600">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{user.role.replace('_', ' ')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className={`mt-1 text-sm font-semibold ${user.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                  {user.status}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <p className="mt-1 text-sm text-gray-900">{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Active</label>
                <p className="mt-1 text-sm text-gray-900">{new Date(user.lastActive).toLocaleDateString()}</p>
              </div>
            </div>

            {user.restaurant && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Restaurant</label>
                <p className="mt-1 text-sm text-gray-900">{user.restaurant}</p>
              </div>
            )}

            {user.ordersCount && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Total Orders</label>
                <p className="mt-1 text-sm text-gray-900">{user.ordersCount}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={() => onToggleStatus(user.id)}
                className={`px-4 py-2 rounded-lg ${
                  user.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                {user.status === 'active' ? 'Block User' : 'Unblock User'}
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}