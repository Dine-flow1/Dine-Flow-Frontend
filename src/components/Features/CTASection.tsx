"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const CTASection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: ctaRef.current } }
    );
  }, []);

  return (
    <div ref={ctaRef} className="mt-16 text-center">
      <p className="mb-4 text-gray-600">
        Ready to transform your restaurant operations?
      </p>
      <button className="px-6 py-3 font-semibold text-white transition-all rounded-lg shadow-md bg-linear-to-r from-orange-500 to-amber-500 hover:scale-105">
        Get Started Today
      </button>
    </div>
  );
};

export default CTASection;
