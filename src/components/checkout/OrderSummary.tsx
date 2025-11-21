"use client";
import { CheckoutData } from '../../types/order';

interface OrderSummaryProps {
  checkoutData: CheckoutData;
}

const OrderSummary = ({ checkoutData }: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        <h3 className="font-medium text-gray-900">Items ({checkoutData.items.length})</h3>
        <div className="space-y-3">
          {checkoutData.items.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">
                  {item.quantity} × {item.name}
                </p>
                {item.specialInstructions && (
                  <p className="text-xs text-gray-500 mt-1">
                    Note: {item.specialInstructions}
                  </p>
                )}
                {item.addons && item.addons.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.addons.map((addon, index) => (
                      <span
                        key={index}
                        className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                      >
                        {addon}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <p className="font-medium text-gray-900 text-sm">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">${checkoutData.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="text-gray-900">${checkoutData.deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">${checkoutData.tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between text-lg font-bold">
            <span className="text-gray-900">Total</span>
            <span className="text-gray-900">${checkoutData.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Delivery Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600">🚚</span>
          <div>
            <p className="text-sm font-medium text-blue-900">Free Delivery</p>
            <p className="text-xs text-blue-700">Estimated delivery: 30-45 mins</p>
          </div>
        </div>
      </div>

      {/* Payment Method Preview */}
      {checkoutData.paymentMethod && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Payment Method</p>
          <p className="text-sm font-medium text-gray-900">
            {checkoutData.paymentMethod === 'razorpay' ? 'Online Payment' : 'Cash on Delivery'}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;