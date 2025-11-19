// src/app/manager/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { DashboardStats, RevenueData, TopFoodItem, FoodItem, Table, User } from '../../types/manager';
import { ManagerNavbar } from '../../components/manager/ManagerNavbar';
import { SectionNavigation } from '../../components/manager/SectionNavigation';
import { DashboardContent } from '../../components/manager/DashboardContent';
import { useManagerData } from '../../hooks/useManagerData';

export default function ManagerDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  
  const {
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
  } = useManagerData();

  return (
    <div className="min-h-screen bg-gray-50">
      <ManagerNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SectionNavigation activeSection={activeSection} onSectionChange={setActiveSection} />
        
        <DashboardContent
          activeSection={activeSection}
          stats={stats}
          revenueData={revenueData}
          topFoodItems={topFoodItems}
          foodItems={foodItems}
          tables={tables}
          users={users}
          onBlockUser={handleBlockUser}
          onUnblockUser={handleUnblockUser}
          onDeleteUser={handleDeleteUser}
          onViewUserDetails={handleViewUserDetails}
          onAddFoodItem={handleAddFoodItem}
          onEditFoodItem={handleEditFoodItem}
          onDeleteFoodItem={handleDeleteFoodItem}
          onAddTable={handleAddTable}
          onRemoveTable={handleRemoveTable}
          onAssignTable={handleAssignTable}
          onUpdateTableStatus={handleUpdateTableStatus}
        />
      </main>
    </div>
  );
}