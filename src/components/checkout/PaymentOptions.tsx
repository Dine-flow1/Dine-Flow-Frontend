"use client";
import { useState } from 'react';

interface PaymentOptionsProps {
  selectedMethod: 'razorpay' | 'cod';
  onMethodChange: (method: 'razorpay' | 'cod') => void;
  onPlaceOrder: () => void;
}

const PaymentOptions = ({ selectedMethod, onMethodChange, onPlaceOrder }: PaymentOptionsProps) => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await onPlaceOrder();
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

      <div className="space-y-4">
        {/* Razorpay Option */}
        <div
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            selectedMethod === 'razorpay'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => onMethodChange('razorpay')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === 'razorpay' ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
              }`}>
                {selectedMethod === 'razorpay' && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Pay Online</h3>
                <p className="text-sm text-gray-600">Credit/Debit Card, UPI, Net Banking</p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900">
              Secure Payment
            </div>
          </div>
          {selectedMethod === 'razorpay' && (
            <div className="mt-3 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-800">
                🔒 Your payment is secured with Razorpay
              </p>
            </div>
          )}
        </div>

        {/* Cash on Delivery Option */}
        <div
          className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
            selectedMethod === 'cod'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => onMethodChange('cod')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === 'cod' ? 'border-green-500 bg-green-500' : 'border-gray-400'
              }`}>
                {selectedMethod === 'cod' && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Cash on Delivery</h3>
                <p className="text-sm text-gray-600">Pay when you receive your order</p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900">
              Pay Later
            </div>
          </div>
          {selectedMethod === 'cod' && (
            <div className="mt-3 p-3 bg-green-100 rounded-lg">
              <p className="text-sm text-green-800">
                💰 Pay cash when your order arrives
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Place Order Button */}
      <div className="mt-8">
        <button
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
          className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isPlacingOrder ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>🚀</span>
              <span>
                {selectedMethod === 'razorpay' ? 'Proceed to Payment' : 'Place Order (COD)'}
              </span>
            </>
          )}
        </button>
        
        {selectedMethod === 'cod' && (
          <p className="text-sm text-gray-600 text-center mt-3">
            You'll pay ${/* Total amount */} when your order arrives
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;