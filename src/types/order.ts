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

// Remove the incorrect default export at the bottom
// Just keep the interface definitions

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
  paymentMethod: string;
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
}
export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: string;
  total: number;
  itemCount: number;
  orderTime: string;
  deliveryAddress: string;
}