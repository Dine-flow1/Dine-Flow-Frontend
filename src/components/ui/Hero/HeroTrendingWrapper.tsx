import React from "react";
import TrendingSection from "../../Trending/TreandingSection";

export default function HeroTrendingWrapper() {
  return (
    <div className="relative">
      <div className="relative z-10">
        <TrendingSection />
      </div>

      <div className="absolute hidden w-16 h-16 bg-yellow-400 rounded-full sm:block lg:w-20 lg:h-20 -top-4 -right-4 opacity-10 animate-float" />
      <div className="absolute hidden w-12 h-12 delay-1000 bg-blue-400 rounded-full sm:block lg:w-16 lg:h-16 -bottom-8 -left-8 opacity-10 animate-float" />
      <div className="absolute hidden w-10 h-10 delay-500 bg-purple-400 rounded-full lg:block lg:w-12 lg:h-12 top-1/2 -right-12 opacity-10 animate-float" />
    </div>
  );
}
