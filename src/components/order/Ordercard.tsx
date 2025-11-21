"use client";
import Link from 'next/link';
import { OrderSummary, OrderCardProps } from '../../types/order';
import { 
  showConfirmDialog, 
  showSuccessToast, 
  showErrorAlert,
  showInfoAlert  // ADD THIS IMPORT
} from '../../utils/sweetAlert';

const OrderCard = ({ order, onViewDetails, showActions = true }: OrderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'on-the-way': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-amber-100 text-amber-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'confirmed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return '✅';
      case 'on-the-way': return '🚗';
      case 'preparing': return '👨‍🍳';
      case 'cancelled': return '❌';
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      default: return '📦';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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

  const handleViewDetails = (e: React.MouseEvent) => {
    if (onViewDetails) {
      e.preventDefault();
      onViewDetails(order.id);
    }
  };

  const handleReorder = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      showSuccessToast('Items added to cart for reorder!');
    } catch (error) {
      showErrorAlert('Failed to reorder items. Please try again.');
    }
  };

  const handleReceipt = async (e: React.MouseEvent) => {
    e.preventDefault();
    showSuccessToast('Receipt downloaded successfully!');
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    const isConfirmed = await showConfirmDialog(
      'Delete Order',
      'Are you sure you want to delete this order from your history?',
      'Yes, Delete',
      'Cancel'
    );
    
    if (isConfirmed) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        showSuccessToast('Order deleted successfully!');
      } catch (error) {
        showErrorAlert('Failed to delete order. Please try again.');
      }
    }
  };

  const handlePayNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    showInfoAlert('Redirecting to payment page...', 'Complete Payment');
    // Redirect to payment page
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
            {order.restaurantName && (
              <p className="text-sm text-gray-500 mt-1">from {order.restaurantName}</p>
            )}
          </div>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">${order.total.toFixed(2)}</p>
          <p className="text-sm text-gray-600">{order.itemCount} item{order.itemCount !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Payment Status */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Payment:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
            {order.paymentStatus.toUpperCase()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Method:</span>
          <span className="text-sm font-medium text-gray-900">
            {order.paymentMethod === 'razorpay' ? 'Online' : 'Cash on Delivery'}
          </span>
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
            onClick={handleViewDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>

      {showActions && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={handleReorder}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            <span>🔄</span>
            Reorder
          </button>
          <button 
            onClick={handleReceipt}
            className="text-gray-600 hover:text-gray-700 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            <span>📄</span>
            Receipt
          </button>
          {order.paymentStatus === 'pending' && order.paymentMethod === 'cod' && (
            <button 
              onClick={handlePayNow}
              className="text-green-600 hover:text-green-700 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
            >
              <span>💰</span>
              Pay Now
            </button>
          )}
          <button 
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200 flex items-center gap-1"
          >
            <span>🗑️</span>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderCard;