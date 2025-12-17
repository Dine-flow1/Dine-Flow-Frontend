import ManagerDashboard from '../../../components/manager/dashboard/ManagerDashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manager Dashboard',
  description: 'Restaurant manager dashboard for daily operations',
};

export default function ManagerDashboardPage() {
  return <ManagerDashboard />;
}