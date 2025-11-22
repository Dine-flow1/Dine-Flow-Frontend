// src/app/manager/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { DashboardStats, RevenueData, TopFoodItem, FoodItem, Table, User } from '../../types/manager';
import { ManagerNavbar } from '../../components/manager/ManagerNavbar';
import { SectionNavigation } from '../../components/manager/SectionNavigation';
import { DashboardContent } from '../../components/manager/DashboardContent';
import { useManagerData } from '../../hooks/useManagerData';
import { useAuth } from '../../Context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

export default function ManagerDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const { currentUser } = useAuth();
  
  // Get restaurant ID from current user or use a default for demo
  const restaurantId = currentUser?.restaurantId || 'rest_1';

  const {
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
    handleUpdateTableStatus,
    handleUpdateOrderStatus,
    refetch
  } = useManagerData(restaurantId);

  // Redirect if not owner
  useEffect(() => {
    if (currentUser && currentUser.role !== 'owner') {
      console.warn('Access denied: User is not a restaurant owner');
      // You can redirect here: window.location.href = '/';
    }
  }, [currentUser]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ManagerNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <LoadingSpinner />
              <p className="mt-4 text-lg text-gray-600">Loading your restaurant dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ManagerNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="mb-4 text-6xl">😔</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Dashboard</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={refetch}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show no restaurant access state
  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ManagerNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="mb-4 text-6xl">🏪</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Restaurant Found</h2>
              <p className="text-gray-600 mb-6">
                You don't have access to any restaurant management dashboard.
              </p>
              <button 
                onClick={() => window.location.href = '/restaurant-owners'}
                className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Register Your Restaurant
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ManagerNavbar 
        restaurantName={restaurant.restaurantName}
        restaurantStatus={restaurant.status}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Status Banner */}
        {restaurant.status === 'pending_verification' && (
          <div className="mb-6 p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
            <div className="flex items-center">
              <span className="text-yellow-600">⚠️</span>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Restaurant Pending Verification
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Your restaurant is under review. You can manage your menu and settings, but orders will be enabled after verification.
                </p>
              </div>
            </div>
          </div>
        )}

        {restaurant.status === 'rejected' && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
            <div className="flex items-center">
              <span className="text-red-600">❌</span>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Restaurant Verification Failed
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  Your restaurant verification was rejected. Please contact support for more information.
                </p>
              </div>
            </div>
          </div>
        )}

        <SectionNavigation 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          restaurantStatus={restaurant.status}
        />
        
        <DashboardContent
          activeSection={activeSection}
          stats={stats}
          revenueData={revenueData}
          topFoodItems={topFoodItems}
          foodItems={foodItems}
          tables={tables}
          users={users}
          orders={orders}
          restaurant={restaurant}
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
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onRefreshData={refetch}
        />
      </main>
    </div>
  );
}