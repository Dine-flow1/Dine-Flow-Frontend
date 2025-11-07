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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 1, 
            scrollTrigger: { 
              trigger: headerRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            } 
          }
        );
      }

      // Grid stagger animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(
          cards,
          { 
            opacity: 0, 
            y: 40,
            scale: 0.9
          },
          { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: { 
              trigger: gridRef.current,
              start: "top 75%",
              end: "bottom 25%",
              toggleActions: "play none none reverse"
            } 
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full px-4 py-12 mx-auto sm:px-6 lg:px-8 max-w-7xl sm:py-16 lg:py-20">
      {/* Header */}
      <div ref={headerRef} className="mb-8 text-center sm:mb-12 lg:mb-16">
        <div className="inline-flex items-center px-3 py-1.5 mb-3 text-xs font-medium rounded-full bg-amber-100 text-amber-600 sm:px-4 sm:py-2 sm:text-sm sm:mb-4">
          <span className="mr-1.5">⚡</span>
          Powerful Features
        </div>
        
        <h2 className="mb-3 font-serif text-2xl font-bold text-gray-900 sm:text-3xl sm:mb-4 lg:text-4xl xl:text-5xl">
          Everything You Need to{" "}
          <span className="text-transparent bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text">
            Run Your Restaurant
          </span>
        </h2>
        
        <p className="max-w-2xl mx-auto text-sm leading-relaxed text-gray-600 sm:text-base sm:leading-loose lg:text-lg">
          Our all-in-one platform gives you complete control over operations,
          customers, and growth with tools designed for modern restaurants.
        </p>
      </div>

      {/* Features Grid */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <div key={feature.title} className="feature-card">
            <FeatureCard feature={feature} index={index} />
          </div>
        ))}
      </div>

      {/* Additional Info Section - Hidden on mobile */}
      <div className="hidden mt-12 lg:mt-16 sm:block">
        <div className="grid grid-cols-1 gap-6 p-6 border bg-linear-to-r from-amber-50 to-orange-50 rounded-2xl border-amber-100 sm:grid-cols-3 sm:p-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 sm:text-3xl">500+</div>
            <div className="text-sm font-medium text-gray-700 sm:text-base">Restaurants Trust Us</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 sm:text-3xl">99%</div>
            <div className="text-sm font-medium text-gray-700 sm:text-base">Uptime Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600 sm:text-3xl">24/7</div>
            <div className="text-sm font-medium text-gray-700 sm:text-base">Customer Support</div>
          </div>
        </div>
      </div>

      {/* Mobile Stats - Only show on mobile */}
      <div className="mt-8 sm:hidden">
        <div className="p-4 border bg-linear-to-r from-amber-50 to-orange-50 rounded-xl border-amber-100">
          <div className="text-center">
            <div className="text-xl font-bold text-amber-600">500+ Restaurants Trust Us</div>
            <div className="mt-1 text-xs text-gray-600">Join the growing community of successful restaurants</div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 sm:mt-16 lg:mt-20">
        <CTASection />
      </div>
    </section>
  );
};

export default FeaturesSection;