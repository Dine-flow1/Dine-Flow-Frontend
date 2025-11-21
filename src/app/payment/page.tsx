"use client";
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import RazorpayPayment from '../../components/payment/RazorpayPayment';
import { 
  showErrorAlert, 
  showSuccessAlert, 
  showSuccessToast,
  showInfoAlert,
  showConfirmDialog 
} from '../../utils/sweetAlert';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentType = searchParams.get('type');
  const [orderData, setOrderData] = useState({
    amount: 3497, // in paise (₹34.97)
    currency: 'INR',
    receipt: `receipt_${Date.now()}`
  });

  useEffect(() => {
    // Show payment info when page loads
    if (paymentType === 'razorpay') {
      showInfoAlert(
        'You will be redirected to a secure payment page. Please do not close this window during the process.',
        'Secure Payment Gateway'
      );
    }
  }, [paymentType]);

  const handlePaymentSuccess = (response: any) => {
    console.log('Payment successful:', response);
    showSuccessToast('Payment verified! Creating your order...');
    
    // Create order in your database
    createOrderAfterPayment(response);
  };

  const handlePaymentFailure = (error: any) => {
    console.error('Payment failed:', error);
    
    if (error === 'Payment cancelled by user') {
      showErrorAlert(
        'Payment was cancelled. You can try again or choose a different payment method.',
        'Payment Cancelled'
      );
    } else {
      showErrorAlert(
        'We encountered an issue processing your payment. Please try again or use a different payment method.',
        'Payment Failed'
      );
    }
    
    // Redirect back to checkout after a delay
    setTimeout(() => {
      router.push('/checkout');
    }, 3000);
  };

  const createOrderAfterPayment = async (paymentResponse: any) => {
    try {
      const orderData = {
        paymentMethod: 'razorpay',
        paymentStatus: 'paid',
        razorpayOrderId: paymentResponse.razorpay_order_id,
        razorpayPaymentId: paymentResponse.razorpay_payment_id,
        status: 'confirmed'
      };

      showSuccessToast('Finalizing your order...');

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const order = await response.json();
        
        showSuccessAlert(
          `Payment successful! Your order #${order.orderNumber} has been confirmed and is being prepared.`,
          '🎉 Order Confirmed!'
        );
        
        // Redirect to order page after success message
        setTimeout(() => {
          router.push(`/order/${order.id}?payment=success`);
        }, 2500);
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error) {
      console.error('Failed to create order:', error);
      showErrorAlert(
        'Payment was successful but we encountered an issue creating your order. Our team has been notified and will contact you shortly.',
        'Order Processing Issue'
      );
      
      // Redirect to orders page anyway
      setTimeout(() => {
        router.push('/orders');
      }, 3000);
    }
  };

  const handleBackToCheckout = async () => {
    const isConfirmed = await showConfirmDialog(
      'Leave Payment Page',
      'Are you sure you want to go back to checkout? Your payment progress will be lost.',
      'Yes, Go Back',
      'Continue Payment'
    );
    
    if (isConfirmed) {
      showSuccessToast('Returning to checkout...');
      setTimeout(() => {
        router.push('/checkout');
      }, 1000);
    }
  };

  if (paymentType !== 'razorpay') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Invalid Payment Method</h2>
          <p className="text-gray-600 mb-6">Please return to checkout and select a valid payment method.</p>
          <button
            onClick={handleBackToCheckout}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
          >
            Back to Checkout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBackToCheckout}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
          >
            <span>←</span>
            <span>Back to Checkout</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💳</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
          <p className="text-gray-600 mt-2">Secure payment powered by Razorpay</p>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 inline-block">
            <p className="text-sm text-blue-800 font-medium">
              Amount: ${(orderData.amount / 100).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Payment Component */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <RazorpayPayment
            orderData={orderData}
            onSuccess={handlePaymentSuccess}
            onFailure={handlePaymentFailure}
          />
        </div>

        {/* Security Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-green-600 text-xl">🔒</span>
            </div>
            <p className="text-sm font-medium text-green-900">SSL Secure</p>
            <p className="text-xs text-green-700">256-bit Encryption</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-blue-600 text-xl">🛡️</span>
            </div>
            <p className="text-sm font-medium text-blue-900">PCI DSS</p>
            <p className="text-xs text-blue-700">Compliant</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-purple-600 text-xl">⚡</span>
            </div>
            <p className="text-sm font-medium text-purple-900">Instant</p>
            <p className="text-xs text-purple-700">Processing</p>
          </div>
        </div>

        {/* Support Info */}
        <div className="mt-8 text-center">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 inline-block">
            <p className="text-sm text-gray-600">
              Need help with payment? Contact support: 
              <span className="font-medium text-gray-900"> support@fooddelivery.com</span>
            </p>
          </div>
        </div>

        {/* Loading State Fallback */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            If payment gateway doesn't load automatically, please refresh the page or contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;