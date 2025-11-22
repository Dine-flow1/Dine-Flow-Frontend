import { useState, useEffect } from 'react';
import { DashboardStats, RevenueData, TopFoodItem, FoodItem, Table, User } from '../types/manager';
import { apiService } from '../lib/apiService';
import { MenuItem } from '../types/restaurant';


// Conversion functions
const convertMenuItemToFoodItem = (menuItem: MenuItem): FoodItem => ({
  id: menuItem.id, // Use id instead of _id
  name: menuItem.name,
  description: menuItem.description,
  price: menuItem.price,
  category: menuItem.category || 'Uncategorized',
  image: menuItem.image,
  isAvailable: menuItem.isAvailable,
  preparationTime: 15,
  ingredients: []
});

const convertTableBookingToTable = (tableBooking: any): Table => ({
  id: tableBooking._id,
  number: tableBooking.tableNumber,
  capacity: tableBooking.seats,
  status: tableBooking.status === 'available' ? 'available' : 
          tableBooking.status === 'booked' ? 'occupied' : 'reserved',
  currentOrder: tableBooking.bookings.find((b: any) => b.status === 'confirmed')?.token || undefined
});

export const useManagerData = (restaurantId?: string) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    monthlyRevenue: 0,
    dailyRevenue: 0,
    totalOrders: 0,
    activeOrders: 0,
    availableTables: 0,
    totalUsers: 0,
    activeUsers: 0,
    blockedUsers: 0
  });

  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [topFoodItems, setTopFoodItems] = useState<TopFoodItem[]>([]);
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all manager data
  useEffect(() => {
    const fetchManagerData = async () => {
      if (!restaurantId) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [restaurantData, menuItemsData, ordersData, tableBookings, usersData] = await Promise.all([
          apiService.getRestaurant(restaurantId),
          apiService.getMenuItems(restaurantId),
          apiService.getOrders(undefined, restaurantId),
          apiService.getTableBookings(restaurantId),
          apiService.getUsers()
        ]);

        setRestaurant(restaurantData);
        setFoodItems(menuItemsData.map(convertMenuItemToFoodItem));
        setOrders(ordersData);
        setTables(tableBookings.map(convertTableBookingToTable));
        setUsers(usersData.map((user: any) => ({
          id: user._id,
          name: user.fullName,
          email: user.email,
          phone: user.contact,
          joinDate: new Date().toISOString().split('T')[0],
          lastLogin: new Date().toISOString(),
          status: 'active' as const,
          totalOrders: 0,
          totalSpent: 0,
          avatar: user.fullName.split(' ').map((n: string) => n[0]).join(''),
          role: 'customer' as const,
          createdAt: new Date().toISOString(),
        })));

        // Calculate stats
        const totalOrders = ordersData.length;
        const activeOrders = ordersData.filter((order: any) => 
          !order.orderStatus.delivered && !order.orderStatus.canceled
        ).length;
        
        const availableTables = tableBookings.filter((tb: any) => tb.status === 'available').length;
        
        // Calculate revenue from completed orders
        const completedOrders = ordersData.filter((order: any) => order.orderStatus.delivered);
        const totalRevenue = completedOrders.reduce((sum: number, order: any) => 
          sum + order.orderSummary.totalAmount, 0
        );

        // Calculate user stats
        const activeUsers = usersData.filter((user: any) => !user.isBlocked).length;
        const blockedUsers = usersData.filter((user: any) => user.isBlocked).length;

        setStats({
          totalRevenue,
          monthlyRevenue: totalRevenue * 0.8,
          dailyRevenue: totalRevenue * 0.05,
          totalOrders,
          activeOrders,
          availableTables,
          totalUsers: usersData.length,
          activeUsers,
          blockedUsers
        });

        // Generate revenue data
        setRevenueData([
          { date: 'Mon', revenue: 1200, orders: 24 },
          { date: 'Tue', revenue: 1800, orders: 32 },
          { date: 'Wed', revenue: 1500, orders: 28 },
          { date: 'Thu', revenue: 2200, orders: 38 },
          { date: 'Fri', revenue: 2800, orders: 45 },
          { date: 'Sat', revenue: 3200, orders: 52 },
          { date: 'Sun', revenue: 2500, orders: 41 }
        ]);

        // Calculate top food items
        const itemSales: Record<string, { sales: number, revenue: number }> = {};
        ordersData.forEach((order: any) => {
          order.items.forEach((item: any) => {
            if (!itemSales[item.itemId]) {
              itemSales[item.itemId] = { sales: 0, revenue: 0 };
            }
            itemSales[item.itemId].sales += item.quantity;
            itemSales[item.itemId].revenue += item.totalPrice;
          });
        });

        const topItems = Object.entries(itemSales)
          .map(([itemId, data]) => {
            const menuItem = menuItemsData.find((mi: any) => mi._id === itemId);
            return {
              id: itemId,
              name: menuItem?.name || 'Unknown Item',
              sales: data.sales,
              revenue: data.revenue,
              image: menuItem?.image || '🍕',
              category: menuItem?.category || 'Unknown'
            };
          })
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);

        setTopFoodItems(topItems);

      } catch (err) {
        console.error('Error fetching manager data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchManagerData();
  }, [restaurantId]);

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
 const handleAddFoodItem = async (newItem: Omit<FoodItem, 'id'>) => {
  if (!restaurantId) return;

  try {
    const menuItemData = {
      restaurantId,
      categoryId: 'cat_1',
      name: newItem.name,
      description: newItem.description,
      price: newItem.price,
      image: newItem.image,
      isAvailable: newItem.isAvailable,
      isVeg: true,
      spiceLevel: 'Medium' as const, // Use type assertion to ensure it matches the expected type
      discount: 0,
      rating: 0,
      tags: []
    };

    const createdItem = await apiService.createMenuItem(menuItemData);
    const foodItem = convertMenuItemToFoodItem(createdItem);
    setFoodItems(prev => [...prev, foodItem]);
    return foodItem;
  } catch (err) {
    console.error('Failed to add food item:', err);
    throw err;
  }
};

  const handleEditFoodItem = async (id: string, updatedItem: Partial<FoodItem>) => {
    try {
      // For now, update locally - in real app, call API
      setFoodItems(prev => prev.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      ));
    } catch (err) {
      console.error('Failed to edit food item:', err);
      throw err;
    }
  };

  const handleDeleteFoodItem = async (id: string) => {
    try {
      setFoodItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete food item:', err);
      throw err;
    }
  };

  // Table Management Handlers
  const handleAddTable = async (newTable: Omit<Table, 'id'>) => {
    if (!restaurantId) return;

    try {
      const tableBookingData = {
        restaurantId,
        tableNumber: newTable.number,
        seats: newTable.capacity,
        isPremium: false,
        priceMultiplier: 1,
        status: 'available',
        bookings: []
      };

      const createdTable = await apiService.createTableBooking(tableBookingData);
      const table = convertTableBookingToTable(createdTable);
      setTables(prev => [...prev, table]);
      setStats(prev => ({ ...prev, availableTables: prev.availableTables + 1 }));
      return table;
    } catch (err) {
      console.error('Failed to add table:', err);
      throw err;
    }
  };

  const handleRemoveTable = async (tableId: string) => {
    try {
      setTables(prev => prev.filter(table => table.id !== tableId));
      setStats(prev => ({ ...prev, availableTables: Math.max(0, prev.availableTables - 1) }));
    } catch (err) {
      console.error('Failed to remove table:', err);
      throw err;
    }
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
    
    const availableTables = tables.filter(table => table.status === 'available').length;
    setStats(prev => ({ ...prev, availableTables }));
  };

  // Order Management Handlers
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      const updatedOrder = await apiService.updateOrderStatus(orderId, status);
      setOrders(prev => prev.map(order => 
        order._id === orderId ? updatedOrder : order
      ));
      
      // Recalculate active orders
      const activeOrders = orders.filter(order => 
        !order.orderStatus.delivered && !order.orderStatus.canceled
      ).length;
      
      setStats(prev => ({ ...prev, activeOrders }));
      return updatedOrder;
    } catch (err) {
      console.error('Failed to update order status:', err);
      throw err;
    }
  };

  return {
    // Data
    stats,
    revenueData,
    topFoodItems,
    foodItems,
    tables,
    users,
    orders,
    restaurant,
    loading,
    error,
    
    // User Management
    handleBlockUser,
    handleUnblockUser,
    handleDeleteUser,
    handleViewUserDetails,
    
    // Menu Management
    handleAddFoodItem,
    handleEditFoodItem,
    handleDeleteFoodItem,
    
    // Table Management
    handleAddTable,
    handleRemoveTable,
    handleAssignTable,
    handleUpdateTableStatus,
    
    // Order Management
    handleUpdateOrderStatus,
    
    // Refresh data
    refetch: () => window.location.reload()
  };
};