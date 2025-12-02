import { RestaurantOwnerStats } from '../../types/restaurant-owner';
import HeroContent from './HeroContent';
import DashboardPreview from './DashboardPreview';

interface HeroSectionProps {
  stats: RestaurantOwnerStats;
}

export const HeroSection = ({ stats }: HeroSectionProps) => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <HeroContent stats={stats} />
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};