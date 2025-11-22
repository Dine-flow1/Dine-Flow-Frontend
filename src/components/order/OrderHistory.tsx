"use client";
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { OrderSummary, OrderHistoryStats } from '../../types/order';
import OrderCard from '../order/Ordercard';

interface OrderHistoryProps {
  userId?: string;
  showStats?: boolean;
  compact?: boolean;
}

const OrderHistory = ({ userId, showStats = true, compact = false }: OrderHistoryProps) => {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [stats, setStats] = useState<OrderHistoryStats | null>(null);
  const router = useRouter();

  // Sample orders with payment methods and status
  const sampleOrders: OrderSummary[] = [
    {
      id: '1',
      orderNumber: 'ORD-784241',
      status: 'preparing',
      total: 67.89,
      itemCount: 3,
      orderTime: '2024-01-15T15:30:00Z',
      deliveryAddress: 'Luxury Suites, Room 301',
      restaurantName: 'Italian Bistro',
      paymentMethod: 'razorpay',
      paymentStatus: 'paid'
    },
    {
      id: '2',
      orderNumber: 'ORD-784240',
      status: 'on-the-way',
      total: 45.50,
      itemCount: 2,
      orderTime: '2024-01-15T15:00:00Z',
      deliveryAddress: 'Business Tower, Suite 1200',
      restaurantName: 'Burger Kingdom',
      paymentMethod: 'cod',
      paymentStatus: 'pending'
    },
    {
      id: '3',
      orderNumber: 'ORD-784239',
      status: 'delivered',
      total: 82.27,
      itemCount: 4,
      orderTime: '2024-01-15T14:30:00Z',
      deliveryAddress: 'Grand Plaza Hotel, Room 405',
      restaurantName: 'Tokyo Sushi',
      paymentMethod: 'razorpay',
      paymentStatus: 'paid'
    },
    {
      id: '4',
      orderNumber: 'ORD-784238',
      status: 'delivered',
      total: 120.75,
      itemCount: 5,
      orderTime: '2024-01-13T18:20:00Z',
      deliveryAddress: 'Seaside Resort, Villa 12',
      restaurantName: 'Mediterranean Grill',
      paymentMethod: 'cod',
      paymentStatus: 'pending'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      const sortedOrders = [...sampleOrders].sort((a, b) => 
        new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime()
      );
      setOrders(sortedOrders);
      
      const totalOrders = sortedOrders.length;
      const totalSpent = sortedOrders
        .filter(order => order.paymentStatus === 'paid')
        .reduce((sum, order) => sum + order.total, 0);
      const deliveredOrders = sortedOrders.filter(order => order.status === 'delivered').length;
      const averageOrderValue = totalOrders > 0 ? totalSpent / totalOrders : 0;

      setStats({
        totalOrders,
        totalSpent,
        deliveredOrders,
        averageOrderValue,
        favoriteItems: ['Margherita Pizza', 'Chicken Burger', 'Sushi Platter']
      });
      
      setLoading(false);
    }, 1500);
  }, [userId]);

  const filteredOrders = useMemo(() => {
    if (activeTab === 'active') {
      return orders.filter(order => 
        ['pending', 'confirmed', 'preparing', 'on-the-way'].includes(order.status)
      );
    } else {
      return orders.filter(order => 
        ['delivered', 'cancelled'].includes(order.status)
      );
    }
  }, [orders, activeTab]);

  const handleViewDetails = (orderId: string) => {
    router.push(`/order/${orderId}`);
  };

  const handleBrowseMenu = () => {
    router.push('/menu');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${compact ? 'max-w-4xl' : 'max-w-7xl'} mx-auto`}>
      {/* Statistics Section */}
      {showStats && stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* ... (same stats cards as before) */}
        </div>
      )}

      {/* Tabs Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
              activeTab === 'active'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            🚀 Active Orders ({orders.filter(o => ['pending', 'confirmed', 'preparing', 'on-the-way'].includes(o.status)).length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
              activeTab === 'completed'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ✅ Order History ({orders.filter(o => ['delivered', 'cancelled'].includes(o.status)).length})
          </button>
        </div>

        <div className="p-6">
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <OrderCard 
                  key={order.id} 
                  order={order} 
                  onViewDetails={handleViewDetails}
                  showActions={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">
                  {activeTab === 'active' ? '🚀' : '✅'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {activeTab === 'active' ? 'No Active Orders' : 'No Order History'}
              </h3>
              <p className="text-gray-600 mb-6">
                {activeTab === 'active' 
                  ? "You don't have any active orders right now."
                  : "Your completed orders will appear here."
                }
              </p>
              <button 
                onClick={handleBrowseMenu}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
              >
                Browse Menu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;