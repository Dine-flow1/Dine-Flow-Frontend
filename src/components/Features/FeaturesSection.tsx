"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FeatureCard from "./FeatureCard";
import CTASection from "./CTASection";
import { features } from "../../data/featuresData";

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: headerRef.current } }
    );
  }, []);

  return (
    <section className="px-6 py-20 mx-auto max-w-7xl">
      {/* Header */}
      <div ref={headerRef} className="mb-12 text-center">
        <div className="inline-block px-4 py-1 mb-4 text-sm font-medium rounded-full bg-amber-100 text-amber-600">
          ⚡ Powerful Features
        </div>
        <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Everything You Need to Run Your Restaurant
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Our all-in-one platform gives you complete control over operations,
          customers, and growth.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} feature={feature} index={index} />
        ))}
      </div>

      {/* CTA */}
      <CTASection />
    </section>
  );
};

export default FeaturesSection;
