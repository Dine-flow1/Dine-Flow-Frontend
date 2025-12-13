"use client";
import { useState, useEffect } from 'react';
import { OrderSummary } from '../../types/order';
import OrderCard from './Ordercard';

const OrdersList = () => {
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const sampleOrders: OrderSummary[] = [
    {
      id: '1',
      orderNumber: 'ORD-784239',
      status: 'delivered',
      total: 82.27,
      itemCount: 4,
      orderTime: '2024-01-15T14:30:00Z',
      deliveryAddress: 'Grand Plaza Hotel, Room 405',
      restaurantName: 'Italian Bistro'
    },
    {
      id: '2',
      orderNumber: 'ORD-784240',
      status: 'on-the-way',
      total: 45.50,
      itemCount: 2,
      orderTime: '2024-01-15T15:00:00Z',
      deliveryAddress: 'Business Tower, Suite 1200',
      restaurantName: 'Burger Kingdom'
    },
    {
      id: '3',
      orderNumber: 'ORD-784241',
      status: 'preparing',
      total: 67.89,
      itemCount: 3,
      orderTime: '2024-01-15T15:30:00Z',
      deliveryAddress: 'Luxury Suites, Room 301',
      restaurantName: 'Tokyo Sushi'
    },
    {
      id: '4',
      orderNumber: 'ORD-784242',
      status: 'cancelled',
      total: 32.99,
      itemCount: 1,
      orderTime: '2024-01-14T10:00:00Z',
      deliveryAddress: 'City Center Hotel, Room 205',
      restaurantName: 'Pizza Palace'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      const sortedOrders = [...sampleOrders].sort((a, b) => 
        new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime()
      );
      setOrders(sortedOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const handleViewDetails = (orderId: string) => {
    window.location.href = `/order/${orderId}`;
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
    <div className="max-w-6xl mx-auto">
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-gray-200 mb-6">
        {[
          { key: 'all', label: 'All Orders' },
          { key: 'on-the-way', label: 'On the Way' },
          { key: 'preparing', label: 'Preparing' },
          { key: 'delivered', label: 'Delivered' },
          { key: 'cancelled', label: 'Cancelled' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
              filter === tab.key
                ? 'bg-blue-500 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

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

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📦</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">
            {filter === 'all' 
              ? "You haven't placed any orders yet."
              : `No ${filter} orders found.`
            }
          </p>
          <button 
            onClick={() => window.location.href = '/menu'}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Browse Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersList;