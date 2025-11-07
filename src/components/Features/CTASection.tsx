"use client";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../ui/Buttons";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection = () => {
  const ctaRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      // Stagger animation for elements
      gsap.fromTo(
        [textRef.current, buttonRef.current],
        { 
          opacity: 0, 
          y: 30 
        },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          stagger: 0.3,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating animation for the button
      gsap.to(buttonRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });
    }, ctaRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={ctaRef} 
      className="w-full py-12 mt-16 bg-linear-to-br from-amber-50 via-orange-50 to-yellow-50 sm:py-16 lg:py-20"
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Text */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h2 className="mb-4 font-serif text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
              Ready to Transform Your{" "}
              <span className="text-transparent bg-linear-to-r from-amber-600 to-orange-600 bg-clip-text">
                Restaurant Operations?
              </span>
            </h2>
            
            <p 
              ref={textRef}
              className="text-lg leading-relaxed text-gray-600 sm:text-xl lg:text-2xl sm:leading-loose"
            >
              Join thousands of successful restaurants already using our platform to streamline their business and boost profits.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6">
            <Button
              ref={buttonRef}
              variant="primary"
              size="lg"
              className="w-full px-8 py-4 text-base sm:w-auto sm:text-lg"
              onClick={() => (window.location.href = "/register")}
            >
              Get Started Free
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              className="w-full px-8 py-4 text-base sm:w-auto sm:text-lg"
              onClick={() => (window.location.href = "/demo")}
            >
              Book a Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <p className="mb-4 text-sm text-gray-500 sm:text-base">
              Trusted by 500+ restaurants worldwide
            </p>
            
            {/* Rating Stars */}
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className="w-5 h-5 fill-current text-amber-400 sm:w-6 sm:h-6"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm font-semibold text-gray-700 sm:text-base">4.9/5 rating</span>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-6 sm:grid-cols-3 sm:gap-6 lg:gap-8">
              <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm sm:p-4">
                <div className="mb-2 text-2xl">🚀</div>
                <span className="text-xs font-medium text-gray-700 sm:text-sm">Easy Setup</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm sm:p-4">
                <div className="mb-2 text-2xl">💰</div>
                <span className="text-xs font-medium text-gray-700 sm:text-sm">Save 30% Time</span>
              </div>
              <div className="flex flex-col items-center col-span-2 p-3 bg-white rounded-lg shadow-sm sm:p-4 sm:col-span-1">
                <div className="mb-2 text-2xl">📈</div>
                <span className="text-xs font-medium text-gray-700 sm:text-sm">Grow Revenue</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 sm:mt-10">
            <p className="text-xs text-gray-400 sm:text-sm">
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;