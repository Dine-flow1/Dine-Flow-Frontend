"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';

interface SidebarItem {
  name: string;
  href: string;
  icon: string;
  badge?: number;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/SaasOwnerDashboard', icon: '📊' },
  { name: 'Analytics', href: '/SaasOwnerDashboard/analytics', icon: '📈' },
  { name: 'Users', href: '/SaasOwnerDashboard/users', icon: '👥' },
  { name: 'Settings', href: '/SaasOwnerDashboard/settings', icon: '⚙️' },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={clsx(
        "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-r from-blue-500 to-purple-600">
              <span className="text-sm font-bold text-white">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SaaSKit</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 mt-8">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => onClose()}
                  className={clsx(
                    "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  )}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="px-2 py-1 text-xs text-white bg-red-500 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-r from-gray-400 to-gray-600">
              <span className="font-semibold text-white">A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
              <p className="text-xs text-gray-500 truncate">admin@saaskit.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;