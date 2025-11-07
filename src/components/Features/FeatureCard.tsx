"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Feature } from "../../data/featuresData";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  feature: Feature;
  index: number;
}

// Type guard to check if feature has CTA
const hasCTA = (feature: Feature): feature is Feature & { cta: { text: string; link: string } } => {
  return !!(feature as any).cta && 
         typeof (feature as any).cta === 'object' && 
         'text' in (feature as any).cta && 
         'link' in (feature as any).cta;
};

const FeatureCard: React.FC<Props> = ({ feature, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      // Staggered animation for better visual appeal
      gsap.fromTo(
        [iconRef.current, contentRef.current],
        { 
          opacity: 0, 
          y: 30 
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hover animation
      const hoverAnimation = gsap.to(cardRef.current, {
        y: -8,
        scale: 1.02,
        duration: 0.3,
        paused: true,
        ease: "power2.out"
      });

      // Hover events
      cardRef.current?.addEventListener("mouseenter", () => hoverAnimation.play());
      cardRef.current?.addEventListener("mouseleave", () => hoverAnimation.reverse());

      return () => {
        cardRef.current?.removeEventListener("mouseenter", () => hoverAnimation.play());
        cardRef.current?.removeEventListener("mouseleave", () => hoverAnimation.reverse());
      };
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="relative p-4 transition-all duration-300 border border-orange-100 group bg-linear-to-br from-white to-orange-50/50 rounded-2xl hover:shadow-lg hover:border-orange-200 sm:p-6 lg:p-8"
    >
      {/* Icon Container */}
      <div
        ref={iconRef}
        className="flex items-center justify-center w-10 h-10 mb-3 text-xl text-white transition-transform duration-300 rounded-xl bg-linear-to-br from-orange-500 to-red-400 group-hover:scale-110 sm:w-12 sm:h-12 sm:text-2xl sm:rounded-lg sm:mb-4 lg:w-14 lg:h-14 lg:text-3xl"
      >
        {feature.icon}
      </div>

      {/* Content */}
      <div ref={contentRef} className="space-y-2 sm:space-y-3">
        <h3 className="font-serif text-base font-semibold leading-tight text-gray-900 sm:text-lg lg:text-xl">
          {feature.title}
        </h3>
        
        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm lg:text-base sm:leading-loose">
          {feature.description}
        </p>
      </div>

      {/* Optional CTA Link - Only show if feature has valid cta */}
      {hasCTA(feature) && (
        <div className="mt-4 lg:mt-6">
          <a
            href={feature.cta.link}
            className="inline-flex items-center text-xs font-medium text-orange-600 transition-colors hover:text-orange-700 sm:text-sm"
          >
            {feature.cta.text}
            <svg
              className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      )}

      {/* Background decorative element - Hidden on mobile */}
      <div className="absolute top-0 right-0 hidden w-16 h-16 -mt-2 -mr-2 transition-opacity duration-300 bg-orange-200 rounded-full opacity-10 group-hover:opacity-20 sm:block" />
    </div>
  );
};

export default FeatureCard;