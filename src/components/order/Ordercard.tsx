"use client";
import Link from 'next/link';

// Define the interface locally
interface OrderSummary {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  itemCount: number;
  orderTime: string;
  deliveryAddress: string;
}

interface OrderCardProps {
  order: OrderSummary;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'on-the-way': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-amber-100 text-amber-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'on-the-way': return '🚗';
      case 'preparing': return '👨‍🍳';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor(order.status)}`}>
            <span className="text-lg">{getStatusIcon(order.status)}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Order #{order.orderNumber}</h3>
            <p className="text-sm text-gray-600">{formatDate(order.orderTime)}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
          <p className="text-sm text-gray-600">{order.itemCount} item{order.itemCount !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
          <p className="text-sm font-medium text-gray-900">{order.deliveryAddress}</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
            {order.status.replace('-', ' ').toUpperCase()}
          </span>
          
          <Link
            href={`/order/${order.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
          🔄 Reorder
        </button>
        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors duration-200">
          📄 Receipt
        </button>
        <button className="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors duration-200">
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default OrderCard;