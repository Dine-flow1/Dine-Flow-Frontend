"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PaymentOptions from '../../components/checkout/PaymentOptions';
import OrderSummary from '../../components/checkout/OrderSummary';
import AddressForm from '../../components/checkout/AddressForm';
import { CheckoutData, CartItem, OrderAddress } from '../../types/order';
import { 
  showErrorAlert, 
  showSuccessAlert, 
  showConfirmDialog,
  showSuccessToast 
} from '../../utils/sweetAlert';

const CheckoutPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<'address' | 'payment'>('address');
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    items: [
      {
        id: '1',
        name: 'Margherita Pizza',
        price: 12.99,
        quantity: 2,
        image: '🍕',
        specialInstructions: 'Extra cheese'
      },
      {
        id: '2',
        name: 'Caesar Salad',
        price: 8.99,
        quantity: 1,
        image: '🥗'
      }
    ],
    address: {
      hotel: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phone: '',
      instructions: ''
    },
    paymentMethod: 'razorpay',
    total: 34.97,
    subtotal: 34.97,
    deliveryFee: 2.99,
    tax: 2.09
  });

  const handleAddressSubmit = (address: OrderAddress) => {
    // Validate address before proceeding
    if (!address.hotel || !address.street || !address.city || !address.state || !address.zipCode || !address.phone) {
      showErrorAlert('Please fill in all required address fields.', 'Incomplete Address');
      return;
    }

    setCheckoutData(prev => ({ ...prev, address }));
    setStep('payment');
    showSuccessToast('Address saved successfully!');
  };

  const handlePaymentMethodChange = (method: 'razorpay' | 'cod') => {
    setCheckoutData(prev => ({ ...prev, paymentMethod: method }));
    
    if (method === 'cod') {
      showSuccessToast('Cash on Delivery selected. Pay when your order arrives!');
    } else {
      showSuccessToast('Online payment selected. Secure payment with Razorpay.');
    }
  };

  const handlePlaceOrder = async () => {
    try {
      // Validate address is complete
      if (!checkoutData.address.hotel || !checkoutData.address.street) {
        showErrorAlert('Please complete your delivery address before placing the order.', 'Address Required');
        setStep('address');
        return;
      }

      if (checkoutData.paymentMethod === 'razorpay') {
        // Show confirmation before redirecting to payment
        const isConfirmed = await showConfirmDialog(
          'Proceed to Payment',
          `You will be redirected to secure payment page to pay $${checkoutData.total.toFixed(2)}.`,
          'Proceed to Payment',
          'Review Order'
        );
        
        if (isConfirmed) {
          showSuccessToast('Redirecting to secure payment...');
          setTimeout(() => {
            router.push('/payment?type=razorpay');
          }, 1000);
        }
      } else {
        // Handle COD order
        const isConfirmed = await showConfirmDialog(
          'Place Cash on Delivery Order',
          `Your order total is $${checkoutData.total.toFixed(2)}. You'll pay when your order arrives.`,
          'Place Order',
          'Cancel'
        );
        
        if (!isConfirmed) return;

        // Show loading state
        showSuccessToast('Placing your order...');
        
        // Simulate API call to create COD order
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...checkoutData,
            status: 'confirmed',
            paymentStatus: 'pending' as const
          })
        });
        
        if (response.ok) {
          const order = await response.json();
          showSuccessAlert(
            `Your order #${order.orderNumber} has been placed successfully! You'll pay $${checkoutData.total.toFixed(2)} when it arrives.`,
            'Order Confirmed!'
          );
          setTimeout(() => {
            router.push(`/order/${order.id}?status=confirmed`);
          }, 2000);
        } else {
          throw new Error('Failed to create order');
        }
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      showErrorAlert(
        'We encountered an issue while placing your order. Please try again or contact support if the problem persists.',
        'Order Failed'
      );
    }
  };

  const handleBackToAddress = () => {
    setStep('address');
    showSuccessToast('Returning to address details...');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order with secure payment</p>
          
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${step === 'address' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'address' ? 'bg-blue-600 text-white' : 'bg-gray-300'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium">Address</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className={`flex items-center ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-300'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back button for payment step */}
        {step === 'payment' && (
          <div className="mb-6">
            <button
              onClick={handleBackToAddress}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              <span>←</span>
              <span>Back to Address</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {step === 'address' ? (
              <AddressForm 
                address={checkoutData.address}
                onSubmit={handleAddressSubmit}
              />
            ) : (
              <PaymentOptions
                selectedMethod={checkoutData.paymentMethod}
                onMethodChange={handlePaymentMethodChange}
                onPlaceOrder={handlePlaceOrder}
              />
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary checkoutData={checkoutData} />
            
            {/* Security Badge */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-lg">🔒</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">Secure Checkout</p>
                  <p className="text-xs text-green-700">Your data is protected with encryption</p>
                </div>
              </div>
            </div>

            {/* Support Info */}
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">💬</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Need Help?</p>
                  <p className="text-xs text-blue-700">Contact support: support@fooddelivery.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;