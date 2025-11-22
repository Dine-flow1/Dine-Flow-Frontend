import { ReactNode } from "react";

export interface MenuItem {
  _id: string;
  id: string; // Changed from number to string
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  isVeg: boolean;
  spiceLevel: "Mild" | "Medium" | "Hot" | "Extra Hot";
  discount: number;
  rating: number;
  tags: string[];
  category?: string;
}

export interface OwnerInfo {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: "customer" | "owner" | "admin";
  contact: string;
  profileImage: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    location: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  isAccountVerified: boolean;
  verifyOtp: string | null;
  verifyOtpExpireAt: string | null;
  resetOtp: string | null;
  resetOtpExpireAt: string | null;
}

export interface Branch {
  _id: string;
  branchName: string;
  address: string;
  geoLocation: {
    type: "Point";
    coordinates: [number, number];
  };
  contactPhone: string;
  openingHours: Record<string, string>;
}

export interface RestaurantData {
  // Core identifiers
  _id: string;
  id: string; // Changed from number to string
  
  // Basic info
  restaurantName: string;
  restaurantType: string;
  description: string;
  cuisine: ReactNode;
  location: ReactNode;
  
  // Media
  logo: string;
  bannerImage: string;
  image: string | Blob | undefined;
  
  // Contact info
  contactEmail: string;
  contactPhone: string;
  website: string;
  
  // Location details
  address: string;
  geolocation: string;
  deliveryRadius: string;
  
  // Business hours
  openingHours: string;
  
  // Business registration
  panNumber: string;
  gstinNumber: string;
  fssaiNumber: string;
  registrationNumber: string;
  
  // Owner info
  owner: OwnerInfo;
  ownerId: string;
  
  // Branches
  branches: Branch[];
  
  // Status and verification
  isVerified: boolean;
  isApproved: boolean;
  status: "pending_verification" | "approved" | "rejected" | "active";
  approvalStatus: "pending" | "approved" | "rejected";
  approvedBy: string | null;
  approvedAt: string | null;
  
  // Timestamps
  createdAt: string;
  
  // Menu
  menu?: MenuItem[];
  
  // OTP fields
  otp: string | null;
  otpExpires: string | null;
}

export interface MenuCategory {
  _id: string;
  restaurantId: string;
  name: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
  image: string | null;
}

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
  paymentGatewayResponse: Record<string, any>;
  createdAt: string;
}

export interface TableBooking {
  _id: string;
  restaurantId: string;
  tableNumber: number;
  seats: number;
  isPremium: boolean;
  priceMultiplier: number;
  status: "available" | "booked" | "maintenance";
  bookings: Booking[];
  createdAt: string;
}

export interface Booking {
  _id: string;
  customerId: string;
  type: "specific" | "any";
  date: string;
  time: string;
  totalAmount: number;
  token: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  paymentStatus: "unpaid" | "paid" | "refunded";
  cancellationReason: string | null;
}

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