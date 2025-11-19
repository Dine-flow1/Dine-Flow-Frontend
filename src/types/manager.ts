export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface TopFoodItem {
  id: string;
  name: string;
  sales: number;
  revenue: number;
  image: string;
  category: string;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentOrder?: string;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  isAvailable: boolean;
  preparationTime: number;
  ingredients: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  lastLogin: string;
  status: 'active' | 'blocked';
  totalOrders: number;
  totalSpent: number;
  avatar: string;
  role: 'customer' | 'vip' | 'premium';
}

export interface DashboardStats {
  totalRevenue: number;
  monthlyRevenue: number;
  dailyRevenue: number;
  totalOrders: number;
  activeOrders: number;
  availableTables: number;
  totalUsers: number;
  activeUsers: number;
  blockedUsers: number;
}