// src/types/restaurant-owner.ts
export interface RestaurantOwnerStats {
  totalOrders: number;
  monthlyRevenue: number;
  activeCustomers: number;
  rating: number;
}

export interface OwnerFeature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface OwnerTestimonial {
  id: string;
  name: string;
  restaurant: string;
  comment: string;
  avatar: string;
  rating: number;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  color: string;
}