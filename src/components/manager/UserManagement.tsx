'use client';
import { User } from '../../types/manager';
import { useState } from 'react';
import { UserSearchFilters } from './UserSearchFilters';
import { UsersTable } from '../../components/manager/UserTable';
import { UserDetailsModal } from './UserDetailsModal';

interface UserManagementProps {
  users: User[];
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onViewDetails: (user: User) => void;
}

export const UserManagement = ({ 
  users, 
  onBlockUser, 
  onUnblockUser, 
  onDeleteUser, 
  onViewDetails 
}: UserManagementProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'customer' | 'vip' | 'premium'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const filteredUsers = users.filter(user => 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.phone.includes(searchTerm)) &&
    (statusFilter === 'all' || user.status === statusFilter) &&
    (roleFilter === 'all' || user.role === roleFilter)
  );

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
    onViewDetails(user);
  };

  const handleCloseModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900">User Management</h3>
        <div className="text-sm text-gray-600">
          Total: {users.length} | Active: {users.filter(u => u.status === 'active').length} | 
          Blocked: {users.filter(u => u.status === 'blocked').length}
        </div>
      </div>

      <UserSearchFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
      />

      <UsersTable
        users={filteredUsers}
        onViewDetails={handleViewDetails}
        onBlockUser={onBlockUser}
        onUnblockUser={onUnblockUser}
        onDeleteUser={onDeleteUser}
      />

      {isDetailsModalOpen && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={handleCloseModal}
          onBlockUser={onBlockUser}
          onUnblockUser={onUnblockUser}
          onDeleteUser={onDeleteUser}
        />
      )}
    </div>
  );
};