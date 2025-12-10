// Owner / User
export interface OwnerInfo {
  _id: string;
  fullName: string;
  email: string;
  password?: string;
  googleId?: string;
  role:
    | "saas_owner"
    | "restaurant_owner"
    | "manager"
    | "customer"
    | "delivery_partner";
  contact?: string;
  phone?: string;
  profileImage?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    location?: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  isAccountVerified?: boolean;
  verifyOtp?: string | null;
  verifyOtpExpireAt?: string | null;
  resetOtp?: string | null;
  resetOtpExpireAt?: string | null;
}

// Menu Item
export interface MenuItem {
  id: string;
  _id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  image?: string | null;
  isAvailable?: boolean;
  isVeg?: boolean;
  spiceLevel?: "Low" | "Medium" | "High";
  discount?: number;
  rating?: number;
  tags?: string[];
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Branch
export interface Branch {
  _id: string;
  branchName: string;
  address: string;
  geoLocation: {
    type: "Point";
    coordinates: [number, number];
  };
  contactPhone: string;
  openingHours?: Record<string, string>;
}

// Menu Category
export interface MenuCategory {
  _id: string;
  restaurantId: string;
  name: string;
  description?: string;
  isActive?: boolean;
  sortOrder?: number;
  image?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

// Restaurant
export interface RestaurantData {
  _id: string;
  restaurantName: string;
  restaurantType: string;
  description?: string;
  logo?: string;
  bannerImage?: string;
  website?: string;

  // optional display fields used across the app
  cuisine?: string | string[];
  address?: string;
  location?: string;
  rating?: number;
  deliveryTime?: number; // in minutes
  deliveryRadius?: number; // in km
  geolocation?: {
    type: "Point";
    coordinates: [number, number];
  } | null;
  openingHours?: Record<string, string> | string;

  contactEmail: string;
  contactPhone: string;

  otp?: string | null;
  otpExpires?: string | null;
  isVerified?: boolean;

  ownerId: string;
  owner?: OwnerInfo;

  panNumber?: string;
  gstinNumber?: string;
  fssaiNumber?: string;
  registrationNumber?: string;

  branches?: Branch[];

  status?: "active" | "suspended" | "pending_verification";
  isApproved?: boolean;
  approvalStatus?: "pending" | "approved" | "rejected";
  approvedBy?: string | null;
  approvedAt?: string | null;

  createdAt?: string;

  menu?: MenuItem[];
  categories?: MenuCategory[];
}

// Orders
export interface ApiOrder {
  _id: string;
  customer: {
    customerId: string;
    name?: string;
    phone?: string;
  };
  restaurant: {
    restaurantId: string;
    name?: string;
    address?: string;
  };
  items: Array<{
    itemId: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  orderSummary: {
    orderType: "delivery" | "pickup";
    totalAmount: number;
    paymentMethod: "COD" | "Online";
    notes?: string;
  };
  deliveryDetails: {
    address?: string;
    instructions?: string;
    phone?: string;
    assignedDeliveryPerson?: {
      id?: string | null;
      name?: string | null;
      phone?: string | null;
    };
    estimatedDeliveryTime?: string | null;
  };
  orderStatus: {
    placed?: string | null;
    confirmed?: string | null;
    preparing?: string | null;
    readyForDelivery?: string | null;
    outForDelivery?: string | null;
    delivered?: string | null;
    canceled?: string | null;
  };
}

// Table Booking
export interface Booking {
  _id: string;
  customerId: string;
  type: "auto" | "specific" | "walkin";
  date: string;
  time: string;
  totalAmount?: number;
  token?: string | null;
  status: "pending" | "approved" | "rejected" | "cancelled" | "completed";
  paymentStatus: "unpaid" | "paid" | "refunded";
  cancellationReason?: string | null;
}

export interface TableBooking {
  _id: string;
  restaurantId: string;
  tableNumber: number;
  seats: number;
  isPremium?: boolean;
  priceMultiplier?: number;
  status: "available" | "reserved" | "occupied";
  bookings?: Booking[];
  createdAt?: string;
  updatedAt?: string;
}

// Payment
export interface Payment {
  _id: string;
  orderId: string;
  restaurantId: string;
  userId: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  transactionId: string;
  paymentGatewayResponse: Record<string, unknown>;
  createdAt: string;
}

// Subscription
export interface Subscription {
  _id: string;
  restaurantId: string;
  subscriptionPlan: "1_month" | "3_months" | "6_months" | "1_year";
  status: "active" | "inactive" | "expired" | "cancelled";
  startDate: string;
  endDate: string;
  amount: number;
  paymentId: string;
  createdAt: string;
}
