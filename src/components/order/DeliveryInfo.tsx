"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { OrderAddress, DeliveryBoy } from './OrderDetails';

interface DeliveryInfoProps {
  address: OrderAddress;
  deliveryBoy?: DeliveryBoy;
}

const DeliveryInfo = ({ address, deliveryBoy }: DeliveryInfoProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.4, ease: "power2.out" }
      );
    }
  }, []);

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_blank');
  };

  const handleMessage = (phone: string) => {
    window.open(`sms:${phone}`, '_blank');
  };

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Delivery Address */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-lg">🏨</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Delivery Address</h3>
            <p className="text-sm text-gray-600">Where to deliver your order</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="font-medium text-gray-900">{address.hotel}</p>
            <p className="text-gray-600">{address.street}</p>
            <p className="text-gray-600">
              {address.city}, {address.state} {address.zipCode}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>📞</span>
            <span>{address.phone}</span>
          </div>

          {address.instructions && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-sm text-amber-800">
                <span className="font-medium">Delivery Instructions: </span>
                {address.instructions}
              </p>
            </div>
          )}

          <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm py-2 border border-gray-300 rounded-lg hover:border-blue-300 transition-colors duration-200">
            📍 Change Delivery Address
          </button>
        </div>
      </div>

      {/* Delivery Boy Info */}
      {deliveryBoy && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-lg">🚴</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Delivery Partner</h3>
              <p className="text-sm text-gray-600">Handling your delivery</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            {/* Delivery Boy Avatar */}
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl">
              {deliveryBoy.image}
            </div>

            {/* Delivery Boy Details */}
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{deliveryBoy.name}</h4>
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                <span>⭐ {deliveryBoy.rating}</span>
                <span>•</span>
                <span>{deliveryBoy.vehicle}</span>
              </div>
              <p className="text-xs text-gray-500">License: {deliveryBoy.licensePlate}</p>
            </div>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            {!showContact ? (
              <button
                onClick={() => setShowContact(true)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
              >
                📞 Show Contact Details
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-gray-600 text-center mb-2">
                  Contact {deliveryBoy.name}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCall(deliveryBoy.phone)}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>📞</span>
                    <span>Call</span>
                  </button>
                  <button
                    onClick={() => handleMessage(deliveryBoy.phone)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>💬</span>
                    <span>Message</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Status */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Current Status:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                On the Way
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryInfo;