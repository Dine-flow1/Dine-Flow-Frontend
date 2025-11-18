// src/types/manager.ts
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

export interface DashboardStats {
  totalRevenue: number;
  monthlyRevenue: number;
  dailyRevenue: number;
  totalOrders: number;
  activeOrders: number;
  availableTables: number;
}