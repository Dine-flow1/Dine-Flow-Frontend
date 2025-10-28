'use client';
import React from 'react';

// ✅ Section Title Component
const SectionTitle = ({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) => (
  <div className="mb-12 text-center">
    <span className="px-4 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full">{badge}</span>
    <h2 className="mt-4 font-serif text-4xl font-bold text-gray-900">{title}</h2>
    <p className="max-w-xl mx-auto mt-2 text-gray-600">{subtitle}</p>
  </div>
);

// ✅ Feature Card Component
const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 text-center transition shadow-sm bg-orange-50 hover:bg-orange-100 rounded-2xl">
    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white rounded-lg bg-linear-to-b from-orange-400 to-red-600">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// ✅ Button Component
const Button = ({ text }: { text: string }) => (
  <button className="px-6 py-3 font-semibold text-white transition shadow-md bg-linear-to-b from-yellow-400 to-orange-600 hover:opacity-90 rounded-xl">
    {text}
  </button>
);

// ✅ Feature Grid Component
const FeatureGrid = ({ features }: { features: { title: string; description: string; icon: React.ReactNode }[] }) => (
  <div className="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
    {features.map((feature, index) => (
      <FeatureCard key={index} {...feature} />
    ))}
  </div>
);

// ✅ Page Component
export default function FeaturesPage() {
  const featuresTop = [
    { title: 'Advanced POS System', description: 'Fast, reliable point-of-sale system with inventory management and staff tracking.', icon: <span>⚡</span> },
    { title: 'Online Ordering', description: 'Accept orders with delivery tracking and seamless payment integration.', icon: <span>🛒</span> },
    { title: 'Table Reservations', description: 'Manage bookings efficiently with automated confirmations and customer management.', icon: <span>📅</span> },
  ];

  const featuresBottom = [
    { title: 'Advanced Analytics', description: 'Gain insights into sales, customer behavior, and inventory with detailed reports.', icon: <span>📊</span> },
    { title: 'Staff Management', description: 'Schedule shifts, track performance, and manage payroll in one place.', icon: <span>👥</span> },
    { title: 'Enterprise Security', description: 'Bank-level encryption and compliance for data protection.', icon: <span>🔒</span> },
  ];

  return (
    <div className="px-6 py-20 text-center bg-white md:px-16">
      <SectionTitle
        badge="✨ Powerful Features"
        title="Everything You Need to Run Your Restaurant"
        subtitle="Our all-in-one platform gives you complete control over operations, customers, and growth."
      />

      <FeatureGrid features={featuresTop} />
      <FeatureGrid features={featuresBottom} />

      <div className="mt-10">
        <p className="mb-4 text-gray-700">Ready to transform your restaurant operations?</p>
        <Button text="Get Started Today" />
      </div>
    </div>
  );
}
