export interface Manager {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchId: string;
  role: 'head-manager' | 'assistant-manager' | 'floor-manager';
  permissions: string[];
  status: 'active' | 'inactive';
  shift: {
    start: string;
    end: string;
    days: string[];
  };
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled';
  orderTime: string;
  estimatedCompletion?: string;
  specialRequests?: string;
  waiterId?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  modifications?: string[];
}

export interface RestaurantTable {
  id: string;
  number: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning' | 'out-of-service';
  currentGuests?: number;
  orderId?: string;
  reservationId?: string;
  waiterId?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'vegetables' | 'meat' | 'dairy' | 'beverages' | 'dry-goods' | 'spices';
  currentStock: number;
  minStock: number;
  unit: 'kg' | 'g' | 'l' | 'ml' | 'units';
  lastUpdated: string;
  supplier?: string;
  pricePerUnit: number;
}

export interface CustomerFeedback {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  tableId?: string;
  orderId?: string;
  status: 'new' | 'reviewed' | 'actioned';
}