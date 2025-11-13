"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface OrderTrackingProps {
  status: string;
  orderTime: string;
  estimatedDelivery: string;
}

const OrderTracking = ({ status, orderTime, estimatedDelivery }: OrderTrackingProps) => {
  const trackingRef = useRef<HTMLDivElement>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>('');

  const steps = [
    { key: 'pending', label: 'Order Placed', icon: '📝' },
    { key: 'confirmed', label: 'Order Confirmed', icon: '✅' },
    { key: 'preparing', label: 'Preparing Food', icon: '👨‍🍳' },
    { key: 'on-the-way', label: 'On the Way', icon: '🚗' },
    { key: 'delivered', label: 'Delivered', icon: '🎉' },
  ];

  useEffect(() => {
    if (trackingRef.current) {
      gsap.fromTo(trackingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
      );
    }
  }, []);

  useEffect(() => {
    // Calculate remaining time
    const updateTime = () => {
      const now = new Date();
      const deliveryTime = new Date(estimatedDelivery);
      const diff = deliveryTime.getTime() - now.getTime();
      
      if (diff > 0) {
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        setTimeRemaining(`${hours}h ${remainingMinutes}m`);
      } else {
        setTimeRemaining('Arriving soon');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, [estimatedDelivery]);

  const currentStepIndex = steps.findIndex(step => step.key === status);

  return (
    <div ref={trackingRef} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Order Status</h2>
          <p className="text-sm text-gray-600">
            {status === 'on-the-way' ? `Estimated delivery in ${timeRemaining}` : 
             status === 'delivered' ? 'Order delivered successfully' :
             'Tracking your order progress'}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          status === 'delivered' ? 'bg-green-100 text-green-800' :
          status === 'on-the-way' ? 'bg-blue-100 text-blue-800' :
          status === 'cancelled' ? 'bg-red-100 text-red-800' :
          'bg-amber-100 text-amber-800'
        }`}>
          {status.replace('-', ' ').toUpperCase()}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-8 top-4 w-0.5 h-3/4 bg-gray-300 transform -translate-y-1">
          <div 
            className="absolute top-0 left-0 w-0.5 bg-green-500 transition-all duration-500"
            style={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.key} className="flex items-center space-x-4">
                {/* Step Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-green-500 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                } ${isCurrent ? 'scale-110 ring-4 ring-green-200' : ''}`}>
                  <span className="text-lg">{step.icon}</span>
                </div>

                {/* Step Label */}
                <div className="flex-1">
                  <p className={`font-medium transition-colors duration-300 ${
                    isCompleted ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                  {isCurrent && status === 'on-the-way' && (
                    <p className="text-sm text-blue-600 mt-1">
                      Your order is out for delivery
                    </p>
                  )}
                </div>

                {/* Checkmark for completed steps */}
                {isCompleted && index < steps.length - 1 && (
                  <div className="text-green-500 text-xl">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Time Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600">
        <p>Order placed: {new Date(orderTime).toLocaleString()}</p>
        <p>Estimated delivery: {new Date(estimatedDelivery).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default OrderTracking;