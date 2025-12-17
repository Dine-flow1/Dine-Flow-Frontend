import RestaurantOwnerDashboard from '@/components/restaurant-owners/dashboard/RestaurantOwnerDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant Owner Dashboard',
  description: 'Manage your restaurant operations',
};

export default function RestaurantOwnerDashboardPage() {
  return <RestaurantOwnerDashboard />;
}