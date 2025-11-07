import { SubscriptionPlan } from '../types/subscription';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'half-yearly',
    name: '6-Month Plan',
    description: 'Perfect for seasonal cooking',
    price: 49.99,
    originalPrice: 59.94, // 9.99 * 6 months
    currency: 'USD',
    period: '6-month',
    savings: 'Save 17%',
    features: [
      'All premium recipes',
      'Ad-free experience',
      'Step-by-step video tutorials',
      'Personalized meal plans',
      'Priority customer support',
      'Monthly cooking challenges',
      'Recipe saving & organizing',
      'Grocery list generator'
    ]
  },
  {
    id: 'yearly',
    name: '1-Year Plan',
    description: 'Best value for dedicated chefs',
    price: 79.99,
    originalPrice: 119.88, // 9.99 * 12 months
    currency: 'USD',
    period: 'yearly',
    popular: true,
    badge: 'Best Value',
    savings: 'Save 33%',
    features: [
      'Everything in 6-month plan',
      'Exclusive masterclass videos',
      '1-on-1 chef consultations (2 sessions)',
      'Advanced cooking techniques',
      'Seasonal recipe collections',
      'Nutritional analysis tools',
      'Early access to new features',
      'VIP community access',
      'Download recipes for offline use',
      'Custom recipe creation service'
    ]
  }
];

export const subscriptionFeatures: { [key: string]: string[] } = {
  'Both plans include': [
    'Ad-free cooking experience',
    'Step-by-step instructions',
    'High-quality recipe videos',
    'Mobile app access',
    'Community forum',
    'Unlimited recipe access',
    'Regular new recipe additions'
  ]
};