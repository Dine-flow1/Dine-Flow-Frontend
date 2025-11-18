
import { OwnerFeature } from '../../types/restaurant-owner';

const features: OwnerFeature[] = [
  {
    icon: '📊',
    title: 'Advanced Analytics',
    description: 'Real-time insights into your restaurant performance, customer behavior, and sales trends.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: '🛒',
    title: 'Online Ordering',
    description: 'Seamless integration for online orders with custom menu management and pricing controls.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: '💰',
    title: 'Revenue Boost',
    description: 'Increase your revenue by 40% with our premium placement and marketing features.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: '👥',
    title: 'Customer Management',
    description: 'Build lasting relationships with your customers through personalized offers and loyalty programs.',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: '⚡',
    title: 'Fast Integration',
    description: 'Get set up in under 30 minutes with our easy-to-use dashboard and setup wizard.',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: '📱',
    title: 'Mobile App',
    description: 'Manage your restaurant on the go with our dedicated mobile application.',
    color: 'from-teal-500 to-green-500'
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools designed specifically for restaurant owners to grow their business
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature }: { feature: OwnerFeature }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white text-xl mb-4 group-hover:scale-110 transition-transform duration-200`}>
        {feature.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {feature.title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
};