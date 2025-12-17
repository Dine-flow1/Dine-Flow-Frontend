'use client';

import { useState, useEffect } from 'react';
import ManagerSidebar from '../dashboard/ManagerSidebar';
import ManagerHeader from '../dashboard/ManagerHeader';
import { OrderManagement } from '../dashboard/sections/OrderManagement';
import { MenuUpdates } from '../dashboard/sections/MenuUpdates';
import { TableManagement } from './sections/TableManagement';
import { BranchDashboard } from './sections/BranchDashboard';
import { CustomerInteraction } from './sections/CustomerInteraction';
import { InventoryManagement } from './sections/InventoryManagement';
import { StaffManagement } from './sections/StaffManagement';
import { ManagerOverview } from './sections/ManagerOverview';
import { gsap } from 'gsap';

type ManagerSection = 
  | 'overview' 
  | 'orders' 
  | 'menu' 
  | 'tables' 
  | 'branch' 
  | 'customers' 
  | 'inventory' 
  | 'staff';

export default function ManagerDashboard() {
  const [activeSection, setActiveSection] = useState<ManagerSection>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Check if manager is logged in
    const token = localStorage.getItem('managerToken');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    // GSAP animations
    gsap.from('.manager-content', {
      duration: 0.5,
      opacity: 0,
      y: 20,
      ease: 'power3.out'
    });
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <ManagerOverview />;
      case 'orders':
        return <OrderManagement />;
      case 'menu':
        return <MenuUpdates />;
      case 'tables':
        return <TableManagement />;
      case 'branch':
        return <BranchDashboard />;
      case 'customers':
        return <CustomerInteraction />;
      case 'inventory':
        return <InventoryManagement />;
      case 'staff':
        return <StaffManagement />;
      default:
        return <ManagerOverview />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('managerToken');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ManagerHeader onLogout={handleLogout} />
      <div className="flex">
        <ManagerSidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className={`flex-1 p-4 md:p-6 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
          <div className="manager-content">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}