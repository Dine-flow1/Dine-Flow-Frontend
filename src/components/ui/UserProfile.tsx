'use client';

import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../Context/AuthContext';

const MySwal = withReactContent(Swal);

// Define the props interface
interface UserProfileProps {
  showMobileView?: boolean;
  className?: string;
}

const UserProfile = ({ 
  showMobileView = false, 
  className = '' 
}: UserProfileProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  
  const { currentUser, logout } = useAuth();

  // GSAP animations for dropdown
  useEffect(() => {
    if (dropdownRef.current) {
      if (isDropdownOpen) {
        gsap.killTweensOf(dropdownRef.current);
        gsap.fromTo(
          dropdownRef.current,
          { 
            opacity: 0, 
            y: -10, 
            scale: 0.95,
            display: 'none' 
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            display: 'block',
            duration: 0.2,
            ease: 'power2.out'
          }
        );
      } else {
        gsap.killTweensOf(dropdownRef.current);
        gsap.to(dropdownRef.current, {
          opacity: 0,
          y: -10,
          scale: 0.95,
          duration: 0.15,
          ease: 'power2.in',
          onComplete: () => {
            if (dropdownRef.current) {
              dropdownRef.current.style.display = 'none';
            }
          }
        });
      }
    }
  }, [isDropdownOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      html: `
        <div class="text-left">
          <p class="text-gray-700 mb-2 font-medium">You will be logged out of your account.</p>
          <p class="text-sm text-amber-600">
            Any unsaved changes will be lost.
          </p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d97706',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'bg-white border border-amber-200 rounded-xl',
        title: 'text-gray-900 text-lg font-semibold',
        htmlContainer: 'text-gray-700',
        confirmButton: 'px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white transition-all',
        cancelButton: 'px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors',
      },
      buttonsStyling: true,
      reverseButtons: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      
      // Button animation
      if (buttonRef.current) {
        gsap.to(buttonRef.current, {
          scale: 0.9,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
          onComplete: () => {
            (async () => {
              try {
                // Call your auth context logout
                logout();
                
                // Show success message
                await MySwal.fire({
                  title: 'Logged out!',
                  text: 'You have been successfully logged out.',
                  icon: 'success',
                  timer: 1500,
                  showConfirmButton: false,
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                });
                
                // Redirect to home page
                router.push('/');
                router.refresh();
                
              } catch (error: any) {
                console.error('Logout failed:', error);
                
                // Show error message
                await MySwal.fire({
                  title: 'Error!',
                  text: error.message || 'Failed to logout. Please try again.',
                  icon: 'error',
                  confirmButtonText: 'OK'
                });
              } finally {
                setIsLoading(false);
                setIsDropdownOpen(false);
              }
            })();
          }
        });
      }
    }
  };

  const handleProfileClick = () => {
    if (showMobileView) {
      // For mobile view, navigate to profile page instead of showing dropdown
      router.push('/profile');
      return;
    }
    
    setIsDropdownOpen(!isDropdownOpen);
    
    // Button animation
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }
  };

  const handleNavigation = (path: string) => {
    setIsDropdownOpen(false);
    router.push(path);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      case 'customer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'owner': return 'Restaurant Owner';
      case 'admin': return 'Administrator';
      case 'customer': return 'Customer';
      default: return 'User';
    }
  };

  // Mobile view (simple avatar)
  if (showMobileView) {
    return (
      <button
        ref={buttonRef}
        onClick={handleProfileClick}
        className={`relative ${className}`}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-semibold shadow-sm">
          {currentUser && getInitials(currentUser.fullName)}
        </div>
      </button>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <button
        ref={buttonRef}
        onClick={handleProfileClick}
        disabled={isLoading}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-amber-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="User menu"
        aria-expanded={isDropdownOpen}
      >
        {/* User Info */}
        <div className="flex flex-col items-end hidden md:flex">
          <span className="text-sm font-medium text-amber-700 group-hover:text-amber-600 transition-colors">
            {currentUser?.fullName}
          </span>
          <span className="text-xs text-amber-600">
            {currentUser && getRoleLabel(currentUser.role)}
          </span>
        </div>
        
        {/* Avatar */}
        <div className="relative">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-semibold shadow-md">
            {currentUser && getInitials(currentUser.fullName)}
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        
        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-amber-500 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={dropdownRef}
        className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-amber-100 z-50 overflow-hidden"
        style={{ display: 'none' }}
      >
        {/* User Info */}
        <div className="p-4 border-b border-amber-50 bg-gradient-to-r from-amber-50 to-orange-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
              {currentUser && getInitials(currentUser.fullName)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-800 truncate">
                {currentUser?.fullName}
              </p>
              <p className="text-xs text-amber-600 truncate">
                {currentUser?.email}
              </p>
              {currentUser && (
                <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeColor(currentUser.role)}`}>
                  {getRoleLabel(currentUser.role)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <button
            onClick={() => handleNavigation('/profile')}
            className="flex items-center w-full px-4 py-3 text-sm text-amber-700 hover:bg-amber-50 transition-colors duration-150"
          >
            <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            My Profile
          </button>
          
          {currentUser?.role === 'owner' && currentUser?.restaurantId && (
            <button
              onClick={() => handleNavigation(`/restaurant/${currentUser.restaurantId}`)}
              className="flex items-center w-full px-4 py-3 text-sm text-amber-700 hover:bg-amber-50 transition-colors duration-150"
            >
              <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              My Restaurant
            </button>
          )}
          
          {currentUser?.role === 'owner' && (
            <button
              onClick={() => handleNavigation('/subscriptions')}
              className="flex items-center w-full px-4 py-3 text-sm text-amber-700 hover:bg-amber-50 transition-colors duration-150"
            >
              <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Subscriptions
            </button>
          )}
          
          {currentUser?.role === 'customer' && (
            <button
              onClick={() => handleNavigation('/my-orders')}
              className="flex items-center w-full px-4 py-3 text-sm text-amber-700 hover:bg-amber-50 transition-colors duration-150"
            >
              <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              My Orders
            </button>
          )}
          
          <div className="border-t border-amber-100 my-2"></div>
          
          <button
            onClick={() => handleNavigation('/settings')}
            className="flex items-center w-full px-4 py-3 text-sm text-amber-700 hover:bg-amber-50 transition-colors duration-150"
          >
            <svg className="w-5 h-5 mr-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </svg>
            Settings
          </button>
          
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 mr-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                Logging out...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;