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
    { key: 'pending', label: 'Order Placed', icon: '📝', description: 'Your order has been received' },
    { key: 'confirmed', label: 'Order Confirmed', icon: '✅', description: 'Restaurant confirmed your order' },
    { key: 'preparing', label: 'Preparing Food', icon: '👨‍🍳', description: 'Chef is cooking your meal' },
    { key: 'on-the-way', label: 'On the Way', icon: '🚗', description: 'Delivery partner is on the way' },
    { key: 'delivered', label: 'Delivered', icon: '🎉', description: 'Order delivered successfully' },
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
    const updateTime = () => {
      const now = new Date();
      const deliveryTime = new Date(estimatedDelivery);
      const diff = deliveryTime.getTime() - now.getTime();
      
      if (diff > 0) {
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        if (hours > 0) {
          setTimeRemaining(`${hours}h ${remainingMinutes}m`);
        } else {
          setTimeRemaining(`${remainingMinutes}m`);
        }
      } else {
        setTimeRemaining('Arriving soon');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [estimatedDelivery]);

  const currentStepIndex = steps.findIndex(step => step.key === status);
  const isCancelled = status === 'cancelled';

  if (isCancelled) {
    return (
      <div ref={trackingRef} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Cancelled</h3>
          <p className="text-gray-600">This order has been cancelled</p>
        </div>
      </div>
    );
  }

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
          status === 'preparing' ? 'bg-amber-100 text-amber-800' :
          status === 'confirmed' ? 'bg-purple-100 text-purple-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {status.replace('-', ' ').toUpperCase()}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-8 top-4 w-0.5 h-3/4 bg-gray-200 transform -translate-y-1">
          <div 
            className="absolute top-0 left-0 w-0.5 bg-green-500 transition-all duration-1000 ease-out"
            style={{ height: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isFuture = index > currentStepIndex;
            
            return (
              <div key={step.key} className="flex items-start space-x-4">
                {/* Step Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-500 ${
                  isCompleted 
                    ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                    : isFuture
                    ? 'bg-gray-100 text-gray-400'
                    : 'bg-blue-500 text-white shadow-lg shadow-blue-200'
                } ${isCurrent ? 'scale-110 ring-4 ring-blue-200 animate-pulse' : ''}`}>
                  <span className="text-lg">{step.icon}</span>
                  
                  {/* Animated dot for current step */}
                  {isCurrent && status === 'on-the-way' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <p className={`font-semibold transition-colors duration-300 ${
                    isCompleted ? 'text-gray-900' : 
                    isCurrent ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                  <p className={`text-sm mt-1 transition-colors duration-300 ${
                    isCompleted ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                  
                  {/* Special messages for current step */}
                  {isCurrent && status === 'on-the-way' && timeRemaining && (
                    <p className="text-sm text-blue-600 font-medium mt-2">
                      🚗 Your food will arrive in {timeRemaining}
                    </p>
                  )}
                  
                  {isCurrent && status === 'preparing' && (
                    <p className="text-sm text-amber-600 font-medium mt-2">
                      👨‍🍳 Your meal is being prepared with care
                    </p>
                  )}
                </div>

                {/* Checkmark for completed steps */}
                {isCompleted && (
                  <div className="text-green-500 text-xl mt-1">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Order Time Info */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 font-medium">Order placed</p>
            <p className="text-gray-900">{new Date(orderTime).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600 font-medium">Estimated delivery</p>
            <p className="text-gray-900">{new Date(estimatedDelivery).toLocaleString()}</p>
          </div>
        </div>
        
        {status === 'delivered' && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm text-center">
              🎉 Your order has been delivered! Enjoy your meal!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;