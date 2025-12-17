'use client';

import { useState, useEffect, useRef } from 'react';
import Sidebar from './Sidebar';
import { Overview } from '../../restaurant-owners/sections/Overview';
import { Managers } from '../sections/Managers';
import { Verifications } from '../sections/Verifications';
import { Branches } from '../../restaurant-owners/sections/Branches';
import { Finance } from '../sections/Finance';
import { StaffManagement } from '../sections/StaffManagement';
import Header from './Header';
import { gsap } from 'gsap';
import MenuController from '../sections/MenuController';

type DashboardSection = 
  | 'overview' 
  | 'managers' 
  | 'verifications' 
  | 'menu' 
  | 'branches' 
  | 'finance' 
  | 'staff';

export default function RestaurantOwnerDashboard() {
  const [activeSection, setActiveSection] = useState<DashboardSection>('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // GSAP Animation: Page content transition (fade out old, fade in new)
  useEffect(() => {
    if (!contentRef.current) return;

    // Animate out old content
    gsap.killTweensOf(contentRef.current);
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.3,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power3.out',
        clearProps: 'all'
      }
    );
  }, [activeSection]);

  // GSAP Animation: Sidebar collapse/expand transition
  useEffect(() => {
    if (!mainRef.current) return;

    gsap.to(mainRef.current, {
      marginLeft: sidebarCollapsed ? '64px' : '256px',
      duration: 0.3,
      ease: 'power2.inOut'
    });
  }, [sidebarCollapsed]);

  // GSAP Animation: Initial page load (stagger effect)
  useEffect(() => {
    const timeline = gsap.timeline();

    // Fade in header
    timeline.fromTo(
      '.dashboard-header',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      0
    );

    // Fade in sidebar
    timeline.fromTo(
      '.dashboard-sidebar',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
      0.1
    );

    // Fade in main content
    timeline.fromTo(
      '.dashboard-content',
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
      0.2
    );

    return () => {
      timeline.kill();
    };
  }, []);

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview />;
      case 'managers':
        return <Managers />;
      case 'verifications':
        return <Verifications />;
      case 'menu':
        return <MenuController />;
      case 'branches':
        return <Branches />;
      case 'finance':
        return <Finance />;
      case 'staff':
        return <StaffManagement />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with fade-in animation */}
      <div className="dashboard-header">
        <Header />
      </div>

      <div className="flex">
        {/* Sidebar with slide-in animation */}
        <div className="dashboard-sidebar">
          <Sidebar 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>

        {/* Main content with smooth transitions */}
        <main
          ref={mainRef}
          className={`flex-1 p-4 md:p-6 transition-all duration-300`}
          style={{ marginLeft: sidebarCollapsed ? '64px' : '256px' }}
        >
          {/* Content fade-in/out animation */}
          <div ref={contentRef} className="dashboard-content">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}