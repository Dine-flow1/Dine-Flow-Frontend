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
  currentLocation?: {
    lat: number;
    lng: number;
  };
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
  deliveredAt?: string;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
  razorpayOrderId?: string;
  restaurantName?: string;
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  total: number;
  itemCount: number;
  orderTime: string;
  deliveryAddress: string;
  items?: OrderItemType[];
  restaurantName?: string;
  estimatedDelivery?: string;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
}

export interface OrderHistoryStats {
  totalOrders: number;
  totalSpent: number;
  deliveredOrders: number;
  averageOrderValue: number;
  favoriteItems: string[];
}

export interface OrderHistoryProps {
  userId?: string;
  showStats?: boolean;
  compact?: boolean;
}

export interface OrderCardProps {
  order: OrderSummary;
  onViewDetails?: (orderId: string) => void;
  showActions?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  specialInstructions?: string;
  addons?: string[];
}

export interface CheckoutData {
  items: CartItem[];
  address: OrderAddress;
  paymentMethod: 'razorpay' | 'cod';
  total: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}