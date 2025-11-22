import { DashboardStats, RevenueData, TopFoodItem, FoodItem, Table, User } from '../../types/manager';

interface DashboardContentProps {
  activeSection: string;
  stats: DashboardStats;
  revenueData: RevenueData[];
  topFoodItems: TopFoodItem[];
  foodItems: FoodItem[];
  tables: Table[];
  users: User[];
  orders?: any[]; // Add orders prop
  restaurant?: any; // Add restaurant prop
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
  onUpdateOrderStatus?: (orderId: string, status: string) => void; // Add order status handler
  onRefreshData?: () => void; // Add refresh handler
}

export function DashboardContent(props: DashboardContentProps) {
  const {
    activeSection,
    stats,
    revenueData,
    topFoodItems,
    foodItems,
    tables,
    users,
    orders = [], // Default to empty array
    restaurant,
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
    onUpdateTableStatus,
    onUpdateOrderStatus,
    onRefreshData
  } = props;

  // Your existing dashboard content code
  // You can now use orders, restaurant, onUpdateOrderStatus, and onRefreshData

  return (
    <div className="space-y-6">
      {/* Overview Section */}
      {activeSection === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800">Total Revenue</h3>
            <p className="text-2xl font-bold text-green-600">₹{stats.totalRevenue}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800">Active Orders</h3>
            <p className="text-2xl font-bold text-blue-600">{stats.activeOrders}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
            <p className="text-2xl font-bold text-purple-600">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-800">Available Tables</h3>
            <p className="text-2xl font-bold text-orange-600">{stats.availableTables}</p>
          </div>

          {/* Orders Section */}
          {orders && orders.length > 0 && (
            <div className="col-span-full bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">Order #{order._id.slice(-6)}</p>
                      <p className="text-sm text-gray-600">{order.customer.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{order.orderSummary.totalAmount}</p>
                      <p className="text-sm text-gray-600 capitalize">
                        {Object.entries(order.orderStatus).find(([_, value]) => value)?.[0] || 'placed'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Restaurant Info */}
          {restaurant && (
            <div className="col-span-full bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Restaurant Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>Name:</strong> {restaurant.restaurantName}</p>
                  <p><strong>Type:</strong> {restaurant.restaurantType}</p>
                  <p><strong>Status:</strong> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                      restaurant.status === 'approved' ? 'bg-green-100 text-green-800' :
                      restaurant.status === 'pending_verification' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {restaurant.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p><strong>Contact:</strong> {restaurant.contactPhone}</p>
                  <p><strong>Email:</strong> {restaurant.contactEmail}</p>
                  <p><strong>Address:</strong> {restaurant.address}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Menu Section */}
      {activeSection === 'menu' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Menu Management</h2>
          <p>Menu items: {foodItems.length}</p>
          {/* Your existing menu management content */}
        </div>
      )}

      {/* Orders Section */}
      {activeSection === 'orders' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Management</h2>
          <p>Total orders: {orders.length}</p>
          {/* Your existing orders management content */}
        </div>
      )}

      {/* Tables Section */}
      {activeSection === 'tables' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Table Management</h2>
          <p>Total tables: {tables.length}</p>
          {/* Your existing table management content */}
        </div>
      )}

      {/* Users Section */}
      {activeSection === 'users' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Management</h2>
          <p>Total users: {users.length}</p>
          {/* Your existing user management content */}
        </div>
      )}
    </div>
  );
}