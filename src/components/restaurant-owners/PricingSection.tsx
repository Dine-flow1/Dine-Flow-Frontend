// src/components/restaurant-owners/PricingSection.tsx
import Link from 'next/link';
import { PricingPlan } from '../../types/restaurant-owner';

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$49',
    period: '/month',
    description: 'Perfect for small restaurants',
    features: [
      'Online Ordering',
      'Basic Analytics',
      'Up to 100 orders/month',
      'Email Support',
      'Menu Management'
    ],
    highlighted: false,
    color: 'border-gray-200'
  },
  {
    name: 'Professional',
    price: '$99',
    period: '/month',
    description: 'Best for growing businesses',
    features: [
      'Everything in Starter',
      'Advanced Analytics',
      'Unlimited Orders',
      'Priority Support',
      'Custom Domain',
      'Marketing Tools'
    ],
    highlighted: true,
    color: 'border-blue-500 border-2'
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: '/month',
    description: 'For large restaurant chains',
    features: [
      'Everything in Professional',
      'Multi-location Support',
      'API Access',
      'Dedicated Account Manager',
      'Custom Features',
      '24/7 Phone Support'
    ],
    highlighted: false,
    color: 'border-gray-200'
  }
];

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free for 30 days. No credit card required. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
  return (
    <div className={`bg-white rounded-2xl p-8 shadow-lg ${plan.color} ${
      plan.highlighted ? 'relative ring-2 ring-blue-500 ring-opacity-50' : ''
    } hover:shadow-xl transition-all duration-300 hover:scale-105`}>
      {plan.highlighted && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
            Most Popular
          </span>
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
      <p className="text-gray-600 mb-6">{plan.description}</p>
      
      <div className="mb-6">
        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
        <span className="text-gray-600">{plan.period}</span>
      </div>

      <ul className="space-y-3 mb-8">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center">
            <span className="text-green-500 mr-3">✓</span>
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>

      <Link 
        href="/signUp?type=restaurant"
        className={`w-full block text-center py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
          plan.highlighted 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg' 
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Get Started
      </Link>
    </div>
  );
};