'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ShoppingBag, Clock, CheckCircle, XCircle, AlertCircle, Filter, Plus } from 'lucide-react';

interface Order {
  id: number;
  table: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
  orderTime: string;
  estimatedTime?: number;
  specialRequests?: string;
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 101, table: 'Table 3', items: [{ name: 'Grilled Salmon', quantity: 2 }, { name: 'Caesar Salad', quantity: 1 }], total: 62.97, status: 'preparing', orderTime: '12:30 PM', estimatedTime: 20 },
    { id: 102, table: 'Table 7', items: [{ name: 'Steak', quantity: 1 }, { name: 'Fries', quantity: 2 }, { name: 'Wine', quantity: 1 }], total: 78.50, status: 'pending', orderTime: '12:35 PM', estimatedTime: 25 },
    { id: 103, table: 'Takeaway', items: [{ name: 'Burger', quantity: 3 }, { name: 'Coke', quantity: 3 }], total: 36.00, status: 'ready', orderTime: '12:20 PM', estimatedTime: 15 },
    { id: 104, table: 'Table 12', items: [{ name: 'Pasta', quantity: 2 }, { name: 'Garlic Bread', quantity: 1 }], total: 42.50, status: 'served', orderTime: '12:15 PM' },
    { id: 105, table: 'Table 5', items: [{ name: 'Salad', quantity: 1 }, { name: 'Soup', quantity: 1 }], total: 24.00, status: 'cancelled', orderTime: '12:40 PM', specialRequests: 'Allergy: No nuts' },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    gsap.from('.order-card', {
      duration: 0.5,
      y: 20,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, []);

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'pending':
        return { color: 'text-yellow-600', bgColor: 'bg-yellow-50', icon: Clock, label: 'Pending' };
      case 'preparing':
        return { color: 'text-blue-600', bgColor: 'bg-blue-50', icon: AlertCircle, label: 'Preparing' };
      case 'ready':
        return { color: 'text-green-600', bgColor: 'bg-green-50', icon: CheckCircle, label: 'Ready' };
      case 'served':
        return { color: 'text-purple-600', bgColor: 'bg-purple-50', icon: CheckCircle, label: 'Served' };
      case 'cancelled':
        return { color: 'text-red-600', bgColor: 'bg-red-50', icon: XCircle, label: 'Cancelled' };
      default:
        return { color: 'text-gray-600', bgColor: 'bg-gray-50', icon: Clock, label: 'Unknown' };
    }
  };

  const updateOrderStatus = (id: number, newStatus: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
  };

  const addNewOrder = () => {
    const newOrder: Order = {
      id: orders.length + 101,
      table: 'Table 8',
      items: [{ name: 'New Order', quantity: 1 }],
      total: 0,
      status: 'pending',
      orderTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedTime: 20
    };
    setOrders([newOrder, ...orders]);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600">Manage and track all restaurant orders in real-time</p>
        </div>
        <button
          onClick={addNewOrder}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Order</span>
        </button>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Orders', value: orders.length, color: 'text-blue-600' },
          { label: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'text-yellow-600' },
          { label: 'Preparing', value: orders.filter(o => o.status === 'preparing').length, color: 'text-blue-600' },
          { label: 'Ready to Serve', value: orders.filter(o => o.status === 'ready').length, color: 'text-green-600' },
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center">
            <Filter className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 mr-4">Filter by Status:</span>
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'preparing', 'ready', 'served', 'cancelled'].map(status => {
                const config = getStatusConfig(status);
                return (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                      filterStatus === status
                        ? `${config.bgColor} ${config.color} border ${config.color.replace('text', 'border')}`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status === 'all' ? 'All Orders' : config.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => {
          const statusConfig = getStatusConfig(order.status);
          const Icon = statusConfig.icon;

          return (
            <div key={order.id} className="order-card bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg font-bold text-gray-800">Order #{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.color}`}>
                        <Icon className="inline h-3 w-3 mr-1" />
                        {statusConfig.label}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-medium">{order.table}</span>
                      <span>•</span>
                      <span>{order.orderTime}</span>
                      {order.estimatedTime && (
                        <>
                          <span>•</span>
                          <span>ETA: {order.estimatedTime} min</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <span className="text-lg">⋯</span>
                  </button>
                </div>

                {/* Order Items */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Items:</p>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                        <span className="text-gray-800">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="text-sm text-gray-600">${(item.quantity * 15).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {order.specialRequests && (
                  <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm font-medium text-yellow-800 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Special Request
                    </p>
                    <p className="text-sm text-yellow-700 mt-1">{order.specialRequests}</p>
                  </div>
                )}

                {/* Total and Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-xl font-bold text-gray-800">${order.total.toFixed(2)}</p>
                  </div>
                  <div className="flex space-x-2">
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'preparing')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start Prep
                      </button>
                    )}
                    {order.status === 'preparing' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Mark Ready
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'served')}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Mark Served
                      </button>
                    )}
                    {(order.status === 'pending' || order.status === 'preparing') && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Orders State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No orders found</h3>
          <p className="text-gray-500 mb-6">Try changing your filter or create a new order</p>
          <button
            onClick={addNewOrder}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Create New Order
          </button>
        </div>
      )}
    </div>
  );
}