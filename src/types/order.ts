export interface OrderItemType {
  id: string;
  _id?: string; // Add for API compatibility
  itemId?: string; // API field
  name: string;
  category: string;
  quantity: number;
  price: number;
  unitPrice?: number; // API field
  totalPrice?: number; // API field
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
  _id?: string; // Add for API compatibility
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

// API Order Structure
export interface ApiOrder {
  _id: string;
  customer: {
    customerId: string;
    name: string;
    phone: string;
  };
  restaurant: {
    restaurantId: string;
    name: string;
    address: string;
  };
  items: Array<{
    itemId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  orderSummary: {
    orderType: 'delivery' | 'pickup';
    totalAmount: number;
    paymentMethod: string;
    notes: string;
  };
  deliveryDetails: {
    address: string;
    instructions: string;
    phone: string;
    assignedDeliveryPerson: {
      id: string | null;
      name: string | null;
      phone: string | null;
    };
    estimatedDeliveryTime: string | null;
  };
  orderStatus: {
    placed: string | null;
    confirmed: string | null;
    preparing: string | null;
    readyForDelivery: string | null;
    outForDelivery: string | null;
    delivered: string | null;
    canceled: string | null;
  };
}

export interface OrderDetails {
  id: string;
  _id?: string; // API compatibility
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  apiStatus?: { // API status mapping
    placed: string | null;
    confirmed: string | null;
    preparing: string | null;
    readyForDelivery: string | null;
    outForDelivery: string | null;
    delivered: string | null;
    canceled: string | null;
  };
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
  paymentMethod: 'razorpay' | 'cod' | 'Online' | 'UPI' | 'Card' | 'Cash';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'completed' | 'refunded';
  razorpayOrderId?: string;
  restaurantName?: string;
  
  // API fields
  customer?: {
    customerId: string;
    name: string;
    phone: string;
  };
  restaurant?: {
    restaurantId: string;
    name: string;
    address: string;
  };
  orderSummary?: {
    orderType: 'delivery' | 'pickup';
    totalAmount: number;
    paymentMethod: string;
    notes: string;
  };
  deliveryDetails?: {
    address: string;
    instructions: string;
    phone: string;
    assignedDeliveryPerson: {
      id: string | null;
      name: string | null;
      phone: string | null;
    };
    estimatedDeliveryTime: string | null;
  };
}

export interface OrderSummary {
  id: string;
  _id?: string; // API compatibility
  orderNumber: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  apiStatus?: { // API status mapping
    placed: string | null;
    confirmed: string | null;
    preparing: string | null;
    readyForDelivery: string | null;
    outForDelivery: string | null;
    delivered: string | null;
    canceled: string | null;
  };
  total: number;
  itemCount: number;
  orderTime: string;
  deliveryAddress: string;
  items?: OrderItemType[];
  restaurantName?: string;
  estimatedDelivery?: string;
  paymentMethod: 'razorpay' | 'cod' | 'Online' | 'UPI' | 'Card' | 'Cash';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'completed' | 'refunded';
  
  // API fields for quick access
  customer?: {
    name: string;
    phone: string;
  };
  restaurant?: {
    name: string;
    address: string;
  };
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
  _id?: string; // API compatibility
  name: string;
  price: number;
  quantity: number;
  image: string;
  specialInstructions?: string;
  addons?: string[];
  // API menu item fields
  restaurantId?: string;
  categoryId?: string;
  description?: string;
  isAvailable?: boolean;
  isVeg?: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Hot';
  discount?: number;
  rating?: number;
  tags?: string[];
}

export interface CheckoutData {
  items: CartItem[];
  address: OrderAddress;
  paymentMethod: 'razorpay' | 'cod' | 'Online' | 'UPI' | 'Card' | 'Cash';
  total: number;
  subtotal: number;
  deliveryFee: number;
  tax: number;
  
  // API order structure
  orderType?: 'delivery' | 'pickup';
  customer?: {
    customerId: string;
    name: string;
    phone: string;
  };
  restaurant?: {
    restaurantId: string;
    name: string;
    address: string;
  };
  notes?: string;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

// API Payment Structure
export interface ApiPayment {
  _id: string;
  orderId: string;
  restaurantId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId: string;
  paymentGatewayResponse: Record<string, any>;
  createdAt: string;
}

// Utility types for conversion between API and frontend formats
export interface OrderConversionUtils {
  // Convert API order to frontend order details
  apiToOrderDetails: (apiOrder: ApiOrder) => OrderDetails;
  
  // Convert API order to order summary
  apiToOrderSummary: (apiOrder: ApiOrder) => OrderSummary;
  
  // Convert frontend order to API order format
  orderDetailsToApi: (order: OrderDetails) => Partial<ApiOrder>;
  
  // Map API status to frontend status
  mapApiStatus: (apiStatus: ApiOrder['orderStatus']) => OrderDetails['status'];
  
  // Map frontend status to API status updates
  mapToApiStatusUpdate: (status: OrderDetails['status']) => Partial<ApiOrder['orderStatus']>;
}

// Order creation response
export interface OrderCreateResponse {
  order: ApiOrder;
  payment?: ApiPayment;
  razorpayOrder?: {
    id: string;
    amount: number;
    currency: string;
  };
}

// Order status update payload
export interface OrderStatusUpdate {
  orderId: string;
  status: keyof ApiOrder['orderStatus'];
  timestamp: string;
}

// Delivery assignment
export interface DeliveryAssignment {
  orderId: string;
  deliveryPerson: {
    id: string;
    name: string;
    phone: string;
  };
  estimatedDeliveryTime: string;
}