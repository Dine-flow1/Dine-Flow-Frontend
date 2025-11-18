// src/app/manager/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  DashboardStats, 
  RevenueData, 
  TopFoodItem, 
  FoodItem, 
  Table 
} from '../../types/manager';
import { ManagerNavbar } from '../../components/manager/ManagerNavbar';
import { StatsOverview } from '../../components/manager/StatsOverview';
import { RevenueChart } from '../../components/manager/RevenueChart';
import { TopFoodItems } from '../../components/manager/TopFoodItems';
import { MenuManagement } from '../../components/manager/MenuManagement';
import { TableManagement } from '../../components/manager/TableManagement';

export default function ManagerDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 125000,
    monthlyRevenue: 28400,
    dailyRevenue: 1248,
    totalOrders: 1250,
    activeOrders: 12,
    availableTables: 8
  });

  const [revenueData, setRevenueData] = useState<RevenueData[]>([
    { date: 'Mon', revenue: 1200, orders: 24 },
    { date: 'Tue', revenue: 1800, orders: 32 },
    { date: 'Wed', revenue: 1500, orders: 28 },
    { date: 'Thu', revenue: 2200, orders: 38 },
    { date: 'Fri', revenue: 2800, orders: 45 },
    { date: 'Sat', revenue: 3200, orders: 52 },
    { date: 'Sun', revenue: 2500, orders: 41 }
  ]);

  const [topFoodItems, setTopFoodItems] = useState<TopFoodItem[]>([
    { id: '1', name: 'Margherita Pizza', sales: 156, revenue: 3120, image: '🍕', category: 'Pizza' },
    { id: '2', name: 'Caesar Salad', sales: 142, revenue: 2840, image: '🥗', category: 'Salads' },
    { id: '3', name: 'Beef Burger', sales: 138, revenue: 4140, image: '🍔', category: 'Burgers' },
    { id: '4', name: 'Pasta Carbonara', sales: 125, revenue: 3750, image: '🍝', category: 'Pasta' },
    { id: '5', name: 'Chocolate Cake', sales: 118, revenue: 1770, image: '🍰', category: 'Desserts' }
  ]);

  const [foodItems, setFoodItems] = useState<FoodItem[]>([
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

  const [tables, setTables] = useState<Table[]>([
    { id: '1', number: 1, capacity: 4, status: 'available' },
    { id: '2', number: 2, capacity: 2, status: 'occupied', currentOrder: 'ORD-001' },
    { id: '3', number: 3, capacity: 6, status: 'reserved' },
    { id: '4', number: 4, capacity: 4, status: 'available' },
    { id: '5', number: 5, capacity: 8, status: 'occupied', currentOrder: 'ORD-002' }
  ]);

  const handleAddFoodItem = (newItem: Omit<FoodItem, 'id'>) => {
    const item: FoodItem = {
      ...newItem,
      id: Date.now().toString()
    };
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

  const handleAddTable = (newTable: Omit<Table, 'id'>) => {
    const table: Table = {
      ...newTable,
      id: Date.now().toString()
    };
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

  return (
    <div className="min-h-screen bg-gray-50">
      <ManagerNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Section */}
        <section id="overview" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Dashboard Overview</h2>
          <StatsOverview stats={stats} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <RevenueChart data={revenueData} />
            <TopFoodItems items={topFoodItems} />
          </div>
        </section>

        {/* Menu Management Section */}
        <section id="menu" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Menu Management</h2>
          <MenuManagement 
            items={foodItems}
            onAddItem={handleAddFoodItem}
            onEditItem={handleEditFoodItem}
            onDeleteItem={handleDeleteFoodItem}
          />
        </section>

        {/* Table Management Section */}
        <section id="tables" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Table Management</h2>
          <TableManagement 
            tables={tables}
            onAssignTable={handleAssignTable}
            onUpdateTableStatus={handleUpdateTableStatus}
            onAddTable={handleAddTable}
            onRemoveTable={handleRemoveTable}
          />
        </section>
      </main>
    </div>
  );
}