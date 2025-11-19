export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'restaurant_owner' | 'manager' | 'delivery';
  status: 'active' | 'blocked';
  joinDate: string;
  lastActive: string;
  restaurant?: string;
  ordersCount?: number;
}