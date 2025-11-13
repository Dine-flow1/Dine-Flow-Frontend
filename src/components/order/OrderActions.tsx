"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface OrderActionsProps {
  orderId: string;
  status: string;
}

const OrderActions = ({ orderId, status }: OrderActionsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: "power2.out" }
      );
    }
  }, []);

  const handleCancelOrder = async () => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return;
    
    setIsCancelling(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    alert('Order cancelled successfully');
    setIsCancelling(false);
  };

  const handleReorder = () => {
    alert('Adding all items to cart for reorder...');
  };

  const handleHelp = () => {
    alert('Connecting you with customer support...');
  };

  const canCancel = ['pending', 'confirmed', 'preparing'].includes(status);

  return (
    <div ref={containerRef} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Actions</h3>
      
      <div className="space-y-3">
        {/* Cancel Order */}
        {canCancel && (
          <button
            onClick={handleCancelOrder}
            disabled={isCancelling}
            className="w-full bg-red-50 border border-red-200 text-red-700 py-3 px-4 rounded-lg font-medium hover:bg-red-100 hover:border-red-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isCancelling ? (
              <>
                <div className="w-4 h-4 border-2 border-red-700 border-t-transparent rounded-full animate-spin"></div>
                <span>Cancelling...</span>
              </>
            ) : (
              <>
                <span>❌</span>
                <span>Cancel Order</span>
              </>
            )}
          </button>
        )}

        {/* Reorder */}
        <button
          onClick={handleReorder}
          className="w-full bg-blue-50 border border-blue-200 text-blue-700 py-3 px-4 rounded-lg font-medium hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>🔄</span>
          <span>Reorder All Items</span>
        </button>

        {/* Get Help */}
        <button
          onClick={handleHelp}
          className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>❓</span>
          <span>Get Help</span>
        </button>

        {/* Download Receipt */}
        <button
          onClick={() => alert('Downloading receipt...')}
          className="w-full bg-green-50 border border-green-200 text-green-700 py-3 px-4 rounded-lg font-medium hover:bg-green-100 hover:border-green-300 transition-all duration-200 flex items-center justify-center space-x-2"
        >
          <span>📄</span>
          <span>Download Receipt</span>
        </button>
      </div>

      {/* Quick Support */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Need immediate help?</p>
          <button
            onClick={() => window.open('tel:+15551234567', '_blank')}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            📞 Call Support: +1 (555) 123-4567
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderActions;