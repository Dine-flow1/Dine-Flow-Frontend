"use client";
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
// import Link from 'next/link';
import UsersHeader from '../users/components/UsersHeader';
import UsersStats from '../users/components/UsersStats';
import UsersFilters from '../users/components/UsersFilters';
import UsersTable from '../users/components/UsersTable';
import UserModal from '../users/components/UserModal';
import { mockUsers } from '../users/data/mockData';
import type { User } from '../users/types/user';

export default function UsersPage() {
  const usersRef = useRef<HTMLDivElement>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [roleFilter, setRoleFilter] = useState<'all' | 'customer' | 'restaurant_owner' | 'manager' | 'delivery'>('all');

  useEffect(() => {
    if (usersRef.current) {
      gsap.fromTo(usersRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);

  const filteredUsers = users.filter(user => {
    const statusMatch = filter === 'all' || user.status === filter;
    const roleMatch = roleFilter === 'all' || user.role === roleFilter;
    return statusMatch && roleMatch;
  });

  return (
    <div ref={usersRef} className="space-y-6">
      <UsersHeader />
      <UsersStats users={users} />
      <UsersFilters 
        filter={filter}
        setFilter={setFilter}
        roleFilter={roleFilter}
        setRoleFilter={setRoleFilter}
      />
      <UsersTable 
        users={filteredUsers}
        onViewUser={setSelectedUser}
        onToggleStatus={(id) => setUsers(users.map(u => u.id === id ? {...u, status: u.status === 'active' ? 'blocked' : 'active'} : u))}
        onDeleteUser={(id) => setUsers(users.filter(u => u.id !== id))}
      />
      <UserModal 
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        onToggleStatus={(id) => setUsers(users.map(u => u.id === id ? {...u, status: u.status === 'active' ? 'blocked' : 'active'} : u))}
        onDeleteUser={(id) => setUsers(users.filter(u => u.id !== id))}
      />
    </div>
  );
}