import type { User } from '../types/user';

export const mockUsers: User[] = [
  {
    id: '1', name: 'John Doe', email: 'john@example.com', role: 'customer',
    status: 'active', joinDate: '2024-01-15', lastActive: '2024-12-19', ordersCount: 12
  },
  {
    id: '2', name: 'Sarah Wilson', email: 'sarah@restaurant.com', role: 'restaurant_owner',
    status: 'active', joinDate: '2024-02-20', lastActive: '2024-12-19', restaurant: 'Tasty Bites'
  },
  {
    id: '3', name: 'Mike Johnson', email: 'mike@manager.com', role: 'manager',
    status: 'active', joinDate: '2024-03-10', lastActive: '2024-12-18'
  },
  {
    id: '4', name: 'Alex Chen', email: 'alex@example.com', role: 'customer',
    status: 'blocked', joinDate: '2024-01-05', lastActive: '2024-12-10', ordersCount: 5
  }
];