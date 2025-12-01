'use client';

import { useState } from 'react';
import {RestaurantOwnerStats}  from '../../types/restaurant-owner';
import { RestaurantNavbar } from '../../components/restaurant-owners/RestaurantNavbar';
import { HeroSection } from '../../components/restaurant-owners/HeroSection';
import { FeaturesSection } from '../../components/restaurant-owners/FeaturesSection';
import { PricingSection } from '../../components/restaurant-owners/PricingSection';
import { TestimonialsSection } from '../../components/restaurant-owners/TestimonialsSection';
import { CTASection } from '../../components/restaurant-owners/CTASection';
import { RestaurantFooter } from '../../components/restaurant-owners/RestaurantFooter';

export default function RestaurantOwnersLandingPage() {
  const [stats] = useState<RestaurantOwnerStats>({
    totalOrders: 12500,
    monthlyRevenue: 284000,
    activeCustomers: 3200,
    rating: 4.8
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50">
      <RestaurantNavbar />
      <HeroSection stats={stats} />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <RestaurantFooter />
    </div>
  );
}