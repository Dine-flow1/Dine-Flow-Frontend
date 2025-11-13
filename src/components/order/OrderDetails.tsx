"use client";
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import OrderItem from './OrderItem';
import OrderTracking from './Ordertracking';
import DeliveryInfo from './DeliveryInfo';
import OrderActions from './OrderActions';

export interface OrderItemType {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
  specialInstructions?: string;
  addons?: string[];
}

export interface OrderAddress {
  hotel: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  instructions?: string;
}

export interface DeliveryBoy {
  id: string;
  name: string;
  phone: string;
  rating: number;
  image: string;
  vehicle: string;
  licensePlate: string;
}

export interface OrderDetails {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  items: OrderItemType[];
  address: OrderAddress;
  deliveryBoy?: DeliveryBoy;
  orderTime: string;
  estimatedDelivery: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

interface OrderDetailsProps {
  orderId?: string;
}

const OrderDetails = ({ orderId }: OrderDetailsProps) => {
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sample order data
  const sampleOrder: OrderDetails = {
    id: '1',
    orderNumber: 'ORD-784239',
    status: 'on-the-way',
    orderTime: '2024-01-15T14:30:00Z',
    estimatedDelivery: '2024-01-15T15:30:00Z',
    items: [
      {
        id: '1',
        name: 'Grilled Salmon',
        category: 'Main Course',
        quantity: 2,
        price: 24.99,
        image: '🐟',
        specialInstructions: 'Less spicy, no onions',
        addons: ['Extra sauce', 'Side salad']
      },
      {
        id: '2',
        name: 'Caesar Salad',
        category: 'Appetizer',
        quantity: 1,
        price: 12.99,
        image: '🥗',
        addons: ['Extra croutons']
      },
      {
        id: '3',
        name: 'Chocolate Cake',
        category: 'Dessert',
        quantity: 1,
        price: 8.99,
        image: '🍰',
        specialInstructions: 'Add birthday candle'
      }
    ],
    address: {
      hotel: 'Grand Plaza Hotel',
      street: '123 Main Street, Room 405',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      instructions: 'Call upon arrival, front desk will guide'
    },
    deliveryBoy: {
      id: '1',
      name: 'Mike Johnson',
      phone: '+1 (555) 987-6543',
      rating: 4.8,
      image: '🚴',
      vehicle: 'Bicycle',
      licensePlate: 'NY-FD784'
    },
    subtotal: 71.96,
    deliveryFee: 3.99,
    tax: 6.32,
    total: 82.27
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrder(sampleOrder);
      setLoading(false);
    }, 1000);
  }, [orderId]);

  useEffect(() => {
    if (containerRef.current && order) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }
  }, [order]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600">The requested order could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
          <p className="text-gray-600">Order #{order.orderNumber}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Items & Tracking */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Tracking */}
            <OrderTracking 
              status={order.status} 
              orderTime={order.orderTime}
              estimatedDelivery={order.estimatedDelivery}
            />

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Order Items</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {order.items.map((item, index) => (
                  <OrderItem
                    key={item.id}
                    item={item}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-900">${order.deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">${order.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Delivery Info & Actions */}
          <div className="space-y-6">
            <DeliveryInfo 
              address={order.address}
              deliveryBoy={order.deliveryBoy}
            />
            
            <OrderActions 
              orderId={order.id}
              status={order.status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;