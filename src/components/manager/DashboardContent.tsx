// src/components/manager/DashboardContent.tsx
import { DashboardStats, RevenueData, TopFoodItem, FoodItem, Table, User } from '../../types/manager';
import { StatsOverview } from './StatsOverview';
import { RevenueChart } from './RevenueChart';
import { TopFoodItems } from './TopFoodItems';
import { MenuManagement } from './MenuManagement';
import { TableManagement } from './TableManagement';
import { UserManagement } from './UserManagement';

interface DashboardContentProps {
  activeSection: string;
  stats: DashboardStats;
  revenueData: RevenueData[];
  topFoodItems: TopFoodItem[];
  foodItems: FoodItem[];
  tables: Table[];
  users: User[];
  onBlockUser: (userId: string) => void;
  onUnblockUser: (userId: string) => void;
  onDeleteUser: (userId: string) => void;
  onViewUserDetails: (user: User) => void;
  onAddFoodItem: (item: Omit<FoodItem, 'id'>) => void;
  onEditFoodItem: (id: string, item: Partial<FoodItem>) => void;
  onDeleteFoodItem: (id: string) => void;
  onAddTable: (table: Omit<Table, 'id'>) => void;
  onRemoveTable: (tableId: string) => void;
  onAssignTable: (tableId: string, orderId: string) => void;
  onUpdateTableStatus: (tableId: string, status: Table['status']) => void;
}

export const DashboardContent = ({
  activeSection,
  stats,
  revenueData,
  topFoodItems,
  foodItems,
  tables,
  users,
  onBlockUser,
  onUnblockUser,
  onDeleteUser,
  onViewUserDetails,
  onAddFoodItem,
  onEditFoodItem,
  onDeleteFoodItem,
  onAddTable,
  onRemoveTable,
  onAssignTable,
  onUpdateTableStatus
}: DashboardContentProps) => {
  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <>
            <StatsOverview stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <RevenueChart data={revenueData} />
              <TopFoodItems items={topFoodItems} />
            </div>
          </>
        );
      case 'menu':
        return (
          <MenuManagement 
            items={foodItems}
            onAddItem={onAddFoodItem}
            onEditItem={onEditFoodItem}
            onDeleteItem={onDeleteFoodItem}
          />
        );
      case 'tables':
        return (
          <TableManagement 
            tables={tables}
            onAssignTable={onAssignTable}
            onUpdateTableStatus={onUpdateTableStatus}
            onAddTable={onAddTable}
            onRemoveTable={onRemoveTable}
          />
        );
      case 'users':
        return (
          <UserManagement 
            users={users}
            onBlockUser={onBlockUser}
            onUnblockUser={onUnblockUser}
            onDeleteUser={onDeleteUser}
            onViewDetails={onViewUserDetails}
          />
        );
      default:
        return (
          <div className="text-center py-12 text-gray-500">
            Select a section to view content
          </div>
        );
    }
  };

  return <div>{renderSection()}</div>;
};