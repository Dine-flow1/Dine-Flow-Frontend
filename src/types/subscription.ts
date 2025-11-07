export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency: string;
  period: '6-month' | 'yearly';
  features: string[];
  popular?: boolean;
  badge?: string;
  savings?: string;
}

export interface SubscriptionFeature {
  icon: string;
  text: string;
  included: boolean;
}