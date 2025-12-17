"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  showConfirmDialog, 
  showSuccessAlert, 
  showErrorAlert,
  showSuccessToast,
  showInfoAlert
} from '../../utils/sweetAlert';

interface OrderActionsProps {
  orderId: string;
  status: string;
  onOrderUpdate?: (orderId: string, newStatus: string) => void;
}

const OrderActions = ({ orderId, status, onOrderUpdate }: OrderActionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const handleCancelOrder = async () => {
    const isConfirmed = await showConfirmDialog(
      'Cancel Order',
      'Are you sure you want to cancel this order? This action cannot be undone.',
      'Yes, Cancel Order',
      'Keep Order'
    );
    
    if (!isConfirmed) return;
    
    setIsCancelling(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      showSuccessAlert('Order has been cancelled successfully!', 'Order Cancelled');
      onOrderUpdate?.(orderId, 'cancelled');
    } catch (error) {
      showErrorAlert('Failed to cancel order. Please try again.', 'Cancellation Failed');
    } finally {
      setIsCancelling(false);
    }
  };

  const handleReorder = async () => {
    setIsReordering(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      showSuccessToast('All items added to cart for reorder!');
      setTimeout(() => {
        window.location.href = '/cart';
      }, 2000);
    } catch (error) {
      showErrorAlert('Failed to reorder. Please try again.', 'Reorder Failed');
    } finally {
      setIsReordering(false);
    }
  };

  const handleHelp = () => {
    showInfoAlert(
      'Our customer support team will contact you shortly.',
      'Need Help?'
    );
  };

  const handleRateOrder = () => {
    showInfoAlert('Redirecting to rating page...', 'Rate Your Order');
  };

  const handleDownloadReceipt = () => {
    showSuccessToast('Receipt downloaded successfully!');
  };

  const canCancel = ['pending', 'confirmed', 'preparing'].includes(status);
  const canRate = status === 'delivered';
  const canReorder = ['delivered', 'cancelled'].includes(status);

  return (
    <div ref={containerRef} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Actions</h3>
      
      <div className="space-y-3">
        {canCancel && (
          <button
            onClick={handleCancelOrder}
            disabled={isCancelling}
            className="w-full bg-red-50 border border-red-200 text-red-700 py-3 px-4 rounded-lg font-medium hover:bg-red-100 hover:border-red-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isCancelling ? (
              <>
                <div className="w-4 h-4 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></div>
                <span>Cancelling Order...</span>
              </>
            ) : (
              <>
                <span>❌</span>
                <span>Cancel Order</span>
              </>
            )}
          </button>
        )}

        {canReorder && (
          <button
            onClick={handleReorder}
            disabled={isReordering}
            className="w-full bg-blue-50 border border-blue-200 text-blue-700 py-3 px-4 rounded-lg font-medium hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isReordering ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                <span>Adding to Cart...</span>
              </>
            ) : (
              <>
                <span>🔄</span>
                <span>Reorder All Items</span>
              </>
            )}
          </button>
        )}

        {canRate && (
          <button
            onClick={handleRateOrder}
            className="w-full bg-yellow-50 border border-yellow-200 text-yellow-700 py-3 px-4 rounded-lg font-medium hover:bg-yellow-100 hover:border-yellow-300 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <span>⭐</span>
            <span>Rate This Order</span>
          </button>
        )}

        <button
          onClick={handleHelp}
          className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 flex items-center justify-center space-x-2"
          >
          <span>❓</span>
          <span>Get Help</span>
        </button>

        <button
          onClick={handleDownloadReceipt}
          className="w-full bg-green-50 border border-green-200 text-green-700 py-3 px-4 rounded-lg font-medium hover:bg-green-100 hover:border-green-300 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>📄</span>
          <span>Download Receipt</span>
        </button>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Need immediate help?</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <button
              onClick={() => window.open('tel:+15551234567', '_blank')}
              className="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              📞 Call Support
            </button>
            <button
              onClick={() => window.open('mailto:support@fooddelivery.com', '_blank')}
              className="text-green-600 hover:text-green-700 font-medium text-sm px-4 py-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
            >
              ✉️ Email Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderActions;