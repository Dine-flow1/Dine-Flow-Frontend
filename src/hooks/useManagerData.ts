// src/hooks/useManagerData.ts
import { useState, useEffect } from 'react';
import { DashboardStats, RevenueData, TopFoodItem, FoodItem, Table, User } from '../types/manager';

export const useManagerData = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 125000,
    monthlyRevenue: 28400,
    dailyRevenue: 1248,
    totalOrders: 1250,
    activeOrders: 12,
    availableTables: 8,
    totalUsers: 156,
    activeUsers: 142,
    blockedUsers: 14
  });

  const [revenueData] = useState<RevenueData[]>([
    { date: 'Mon', revenue: 1200, orders: 24 },
    { date: 'Tue', revenue: 1800, orders: 32 },
    { date: 'Wed', revenue: 1500, orders: 28 },
    { date: 'Thu', revenue: 2200, orders: 38 },
    { date: 'Fri', revenue: 2800, orders: 45 },
    { date: 'Sat', revenue: 3200, orders: 52 },
    { date: 'Sun', revenue: 2500, orders: 41 }
  ]);

  const [topFoodItems] = useState<TopFoodItem[]>([
    { id: '1', name: 'Margherita Pizza', sales: 156, revenue: 3120, image: '🍕', category: 'Pizza' },
    { id: '2', name: 'Caesar Salad', sales: 142, revenue: 2840, image: '🥗', category: 'Salads' },
    { id: '3', name: 'Beef Burger', sales: 138, revenue: 4140, image: '🍔', category: 'Burgers' },
    { id: '4', name: 'Pasta Carbonara', sales: 125, revenue: 3750, image: '🍝', category: 'Pasta' },
    { id: '5', name: 'Chocolate Cake', sales: 118, revenue: 1770, image: '🍰', category: 'Desserts' }
  ]);

  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Initialize sample data
    setFoodItems([
      {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        price: 20,
        category: 'Pizza',
        image: '🍕',
        isAvailable: true,
        preparationTime: 15,
        ingredients: ['Tomato sauce', 'Mozzarella', 'Fresh basil', 'Olive oil']
      },
      {
        id: '2',
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
        price: 20,
        category: 'Salads',
        image: '🥗',
        isAvailable: true,
        preparationTime: 10,
        ingredients: ['Romaine lettuce', 'Caesar dressing', 'Croutons', 'Parmesan']
      }
    ]);

    setTables([
      { id: '1', number: 1, capacity: 4, status: 'available' },
      { id: '2', number: 2, capacity: 2, status: 'occupied', currentOrder: 'ORD-001' },
      { id: '3', number: 3, capacity: 6, status: 'reserved' },
      { id: '4', number: 4, capacity: 4, status: 'available' },
      { id: '5', number: 5, capacity: 8, status: 'occupied', currentOrder: 'ORD-002' }
    ]);

    setUsers([
      {
        id: '1',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        joinDate: '2024-01-15',
        lastLogin: '2024-03-20',
        status: 'active',
        totalOrders: 25,
        totalSpent: 1250,
        avatar: 'JS',
        role: 'vip'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 987-6543',
        joinDate: '2024-02-10',
        lastLogin: '2024-03-19',
        status: 'active',
        totalOrders: 18,
        totalSpent: 890,
        avatar: 'SJ',
        role: 'premium'
      }
    ]);
  }, []);

  // User Management Handlers
  const handleBlockUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'blocked' as const } : user
    ));
    setStats(prev => ({
      ...prev,
      activeUsers: Math.max(0, prev.activeUsers - 1),
      blockedUsers: prev.blockedUsers + 1
    }));
  };

  const handleUnblockUser = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: 'active' as const } : user
    ));
    setStats(prev => ({
      ...prev,
      activeUsers: prev.activeUsers + 1,
      blockedUsers: Math.max(0, prev.blockedUsers - 1)
    }));
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(user => user.id === userId);
    setUsers(prev => prev.filter(user => user.id !== userId));
    
    if (userToDelete) {
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers - 1,
        activeUsers: userToDelete.status === 'active' ? prev.activeUsers - 1 : prev.activeUsers,
        blockedUsers: userToDelete.status === 'blocked' ? prev.blockedUsers - 1 : prev.blockedUsers
      }));
    }
  };

  const handleViewUserDetails = (user: User) => {
    console.log('Viewing user details:', user);
  };

  // Menu Management Handlers
  const handleAddFoodItem = (newItem: Omit<FoodItem, 'id'>) => {
    const item: FoodItem = { ...newItem, id: Date.now().toString() };
    setFoodItems(prev => [...prev, item]);
  };

  const handleEditFoodItem = (id: string, updatedItem: Partial<FoodItem>) => {
    setFoodItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));
  };

  const handleDeleteFoodItem = (id: string) => {
    setFoodItems(prev => prev.filter(item => item.id !== id));
  };

  // Table Management Handlers
  const handleAddTable = (newTable: Omit<Table, 'id'>) => {
    const table: Table = { ...newTable, id: Date.now().toString() };
    setTables(prev => [...prev, table]);
    setStats(prev => ({ ...prev, availableTables: prev.availableTables + 1 }));
  };

  const handleRemoveTable = (tableId: string) => {
    setTables(prev => prev.filter(table => table.id !== tableId));
    setStats(prev => ({ ...prev, availableTables: Math.max(0, prev.availableTables - 1) }));
  };

  const handleAssignTable = (tableId: string, orderId: string) => {
    setTables(prev => prev.map(table => 
      table.id === tableId ? { ...table, currentOrder: orderId } : table
    ));
  };

  const handleUpdateTableStatus = (tableId: string, status: Table['status']) => {
    setTables(prev => prev.map(table => 
      table.id === tableId ? { ...table, status } : table
    ));
  };

  return {
    stats,
    revenueData,
    topFoodItems,
    foodItems,
    tables,
    users,
    handleBlockUser,
    handleUnblockUser,
    handleDeleteUser,
    handleViewUserDetails,
    handleAddFoodItem,
    handleEditFoodItem,
    handleDeleteFoodItem,
    handleAddTable,
    handleRemoveTable,
    handleAssignTable,
    handleUpdateTableStatus
  };
};