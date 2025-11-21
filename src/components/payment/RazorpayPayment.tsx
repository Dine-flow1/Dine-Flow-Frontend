"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayPaymentProps {
  orderData: {
    amount: number;
    currency?: string;
    receipt?: string;
  };
  onSuccess: (response: any) => void;
  onFailure: (error: any) => void;
}

const RazorpayPayment = ({ orderData, onSuccess, onFailure }: RazorpayPaymentProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const loadRazorpayScript = () => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      setLoading(false);
      initializePayment();
    };
    script.onerror = () => {
      setError('Failed to load payment gateway');
      setLoading(false);
    };
    document.body.appendChild(script);
  };

  const initializePayment = async () => {
    try {
      // Create order on your backend
      const response = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create payment order');
      }

      const { id: order_id, amount, currency } = await response.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: 'FoodDelivery',
        description: 'Order Payment',
        order_id: order_id,
        handler: async function (response: any) {
          try {
            // Verify payment on your backend
            const verifyResponse = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response)
            });

            if (verifyResponse.ok) {
              onSuccess(response);
              router.push('/orders?payment=success');
            } else {
              onFailure('Payment verification failed');
            }
          } catch (error) {
            onFailure(error);
          }
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '+919999999999'
        },
        notes: {
          address: 'FoodDelivery Order'
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: function() {
            onFailure('Payment cancelled by user');
            router.push('/checkout');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setError('Failed to initialize payment');
      onFailure(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing payment gateway...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">❌</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Error</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={() => router.push('/checkout')}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
        >
          Back to Checkout
        </button>
      </div>
    );
  }

  return null;
};

export default RazorpayPayment;