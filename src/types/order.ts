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
  status: string;
  orderTime: string;
  estimatedDelivery: string;
  items: OrderItemType[];
  address: OrderAddress;
  deliveryBoy?: DeliveryBoy;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  paymentMethod: 'razorpay' | 'cod';
  paymentStatus: 'paid' | 'pending' | 'failed';
}

export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  itemCount: number;
  orderTime: string;
  deliveryAddress: string;
  restaurantName?: string;
  paymentMethod?: string;
  paymentStatus?: string;
}

export interface OrderHistoryStats {
  totalOrders: number;
  totalSpent: number;
  deliveredOrders: number;
  averageOrderValue: number;
  favoriteItems: string[];
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
  image: string | any;
  specialInstructions?: string;
  addons?: string[];
  restaurantId?: string;
  restaurantName?: string;
  isVeg?: boolean;
}