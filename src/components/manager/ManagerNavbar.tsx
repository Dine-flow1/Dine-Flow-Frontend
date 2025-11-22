interface ManagerNavbarProps {
  restaurantName?: string;
  restaurantStatus?: string;
}

export function ManagerNavbar({ restaurantName, restaurantStatus }: ManagerNavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">
              {restaurantName || "Restaurant Manager"}
            </h1>
            {restaurantStatus && (
              <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                restaurantStatus === 'approved' ? 'bg-green-100 text-green-800' :
                restaurantStatus === 'pending_verification' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {restaurantStatus}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              Notifications
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              Settings
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}