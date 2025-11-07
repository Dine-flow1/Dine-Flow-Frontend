"use client";
import { useLayoutEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import Button from "./Buttons";
import TrendingSection from "../Trending/TreandingSection";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - go to next slide
      setCurrentSlide(prev => (prev + 1) % 2);
    } else if (isRightSwipe) {
      // Swipe right - go to previous slide
      setCurrentSlide(prev => (prev - 1 + 2) % 2);
    }
  }, [touchStart, touchEnd, minSwipeDistance]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
      
      if (!isTouchDevice) {
        gsap.fromTo(
          textRef.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );

        gsap.fromTo(
          buttonsRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "back.out(1.7)" }
        );
      } else {
        gsap.fromTo(
          [textRef.current, buttonsRef.current],
          { opacity: 0 },
          { opacity: 1, duration: 0.8, stagger: 0.2 }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Animation for slide transition
  useLayoutEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        x: `-${currentSlide * 100}%`,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [currentSlide]);

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <section
      ref={heroRef}
      className="flex items-center min-h-screen pt-16 pb-8 overflow-hidden bg-linear-to-br from-white via-blue-50/30 to-purple-50/30 lg:pt-20 lg:pb-0"
    >
      {/* Mobile Swipe Container */}
      <div 
        ref={containerRef}
        className="flex w-full lg:hidden"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slide 1: Text Content */}
        <div className="w-full px-4 shrink-0">
          <div className="flex flex-col justify-center min-h-[70vh]">
            <div ref={textRef} className="space-y-4 md:space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 space-x-2 text-xs font-semibold border rounded-full bg-linear-to-r from-primary-50 to-blue-50 text-primary-700 border-primary-200 md:px-4 md:py-2 md:text-sm">
                <span>✨</span>
                <span>The Future of Restaurant Management</span>
              </div>

              {/* Main Heading */}
              <h1 className="font-serif text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                Grow Your Restaurant{" "}
                <span className="block text-transparent bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text">
                  Business with Ease
                </span>
              </h1>

              {/* Description */}
              <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg sm:leading-loose">
                Streamline your operations, increase efficiency, and boost profits
                with our comprehensive management platform designed for modern
                restaurants.
              </p>

              {/* CTA Buttons */}
              <div
                ref={buttonsRef}
                className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4"
              >
                <Button
                  variant="primary"
                  onClick={() => (window.location.href = "/register")}
                >
                  Register Your Restaurant Now
                </Button>
              </div>

              {/* Mobile Trust indicators */}
              <div className="pt-4 md:hidden">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-6 h-6 border-2 border-white rounded-full bg-linear-to-r from-amber-400 to-amber-600"
                        />
                      ))}
                    </div>
                    <span>500+ restaurants trust us</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>⭐️⭐️⭐️⭐️⭐️</span>
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Trending Section */}
        <div className="w-full px-4 shrink-0">
          <div className="flex flex-col justify-center min-h-[70vh]">
            <div className="relative">
              <div className="relative z-10">
                <TrendingSection />
              </div>
              
              {/* Mobile decorative elements */}
              <div className="absolute w-8 h-8 bg-yellow-400 rounded-full -top-2 -right-2 opacity-5 animate-float" />
              <div className="absolute w-6 h-6 delay-1000 bg-blue-400 rounded-full -bottom-2 -left-2 opacity-5 animate-float" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Original */}
      <div className="container items-center hidden gap-6 px-4 mx-auto lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
        {/* Text Content */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <div ref={textRef} className="space-y-4 md:space-y-6 lg:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 space-x-2 text-xs font-semibold border rounded-full bg-linear-to-r from-primary-50 to-blue-50 text-primary-700 border-primary-200 md:px-4 md:py-2 md:text-sm lg:text-base">
              <span>✨</span>
              <span>The Future of Restaurant Management</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
              Grow Your Restaurant{" "}
              <span className="block text-transparent bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text">
                Business with Ease
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl lg:text-lg xl:text-xl sm:leading-loose">
              Streamline your operations, increase efficiency, and boost profits
              with our comprehensive management platform designed for modern
              restaurants.
            </p>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4 md:pt-4"
            >
              <Button
                variant="primary"
                onClick={() => (window.location.href = "/register")}
              >
                Register Your Restaurant Now
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="pt-4 md:block lg:pt-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-6 h-6 border-2 border-white rounded-full bg-linear-to-r from-amber-400 to-amber-600"
                      />
                    ))}
                  </div>
                  <span>500+ restaurants trust us</span>
                </div>
                <div className="items-center hidden gap-2 text-sm text-gray-600 lg:flex">
                  <span>⭐️⭐️⭐️⭐️⭐️</span>
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Section Component */}
        <div className="relative order-1 lg:order-2">
          <div className="relative z-10">
            <TrendingSection />
          </div>
          
          {/* Floating background elements */}
          <div className="absolute hidden w-16 h-16 bg-yellow-400 rounded-full sm:block lg:w-20 lg:h-20 -top-4 -right-4 opacity-10 animate-float" />
          <div className="absolute hidden w-12 h-12 delay-1000 bg-blue-400 rounded-full sm:block lg:w-16 lg:h-16 -bottom-8 -left-8 opacity-10 animate-float" />
          <div className="absolute hidden w-10 h-10 delay-500 bg-purple-400 rounded-full lg:block lg:w-12 lg:h-12 top-1/2 -right-12 opacity-10 animate-float" />
        </div>
      </div>

      {/* Mobile Swipe Indicators */}
      <div className="flex justify-center gap-2 mt-4 lg:hidden">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-amber-500 w-6" 
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator - Hidden on mobile, visible on desktop */}
      <div className="absolute flex-col items-center hidden gap-2 text-gray-400 transform -translate-x-1/2 bottom-8 left-1/2 lg:flex">
        <span className="text-sm">Scroll to explore</span>
        <div className="flex justify-center w-5 h-8 border-2 border-gray-300 rounded-full">
          <div className="w-1 h-2 mt-2 bg-gray-300 rounded-full animate-bounce" />
        </div>
      </div>

      {/* Swipe Hint for Mobile */}
      <div className="absolute flex items-center gap-2 text-sm text-gray-400 transform -translate-x-1/2 bottom-4 left-1/2 lg:hidden">
        <span className="animate-pulse">Swipe to explore</span>
        <div className="flex gap-1">
          <span>←</span>
          <span>→</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;