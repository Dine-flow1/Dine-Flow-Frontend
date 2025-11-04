"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Button from "./Buttons";
import TrendingSection from "../components/TreandingSection";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="flex items-center min-h-screen pt-16 bg-linear-to-br from-white via-blue-50/30 to-purple-50/30"
    >
      <div className="container grid items-center gap-8 px-4 mx-auto lg:grid-cols-2 lg:gap-12">
        {/* Text Content - Order changes on mobile */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <div ref={textRef} className="space-y-4 md:space-y-6">
            <div className="inline-flex items-center px-3 py-1.5 space-x-2 text-xs font-semibold border rounded-full bg-linear-to-r from-primary-50 to-blue-50 text-primary-700 border-primary-200 md:px-4 md:py-2 md:text-sm">
              <span>✨</span>
              <span>The Future of Restaurant Management</span>
            </div>

            <h1 className="font-serif text-3xl font-bold leading-tight text-gray-900 md:text-4xl lg:text-5xl xl:text-6xl">
              Grow Your Restaurant{" "}
              <span className="text-transparent bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text">
                Business with Ease
              </span>
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl">
              Streamline your operations, increase efficiency, and boost profits
              with our comprehensive management platform designed for modern
              restaurants.
            </p>

            <div
              ref={buttonsRef}
              className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4 md:pt-4 text-amber-600"
            >
              <Button
                className="px-6 py-3 text-base md:px-8 md:py-4 md:text-lg"
                onClick={() => (window.location.href = "/register")}
              >
                Register your restaurant Now
              </Button>
            </div>
          </div>
        </div>

        {/* Trending Section Component - Order changes on mobile */}
        <div className="relative order-1 mb-8 lg:order-2 lg:mb-0">
          <TrendingSection />
          
          {/* Floating background elements - Hidden on mobile, visible on larger screens */}
          <div className="absolute hidden w-20 h-20 bg-yellow-400 rounded-full lg:block -top-4 -right-4 opacity-10 animate-float" />
          <div className="absolute hidden w-16 h-16 delay-1000 bg-blue-400 rounded-full lg:block -bottom-8 -left-8 opacity-10 animate-float" />
          <div className="absolute hidden w-12 h-12 delay-500 bg-purple-400 rounded-full lg:block top-1/2 -right-12 opacity-10 animate-float" />
          
          {/* Mobile-only decorative elements */}
          <div className="absolute w-12 h-12 bg-yellow-400 rounded-full -top-2 -right-2 opacity-10 animate-float lg:hidden" />
          <div className="absolute w-10 h-10 delay-1000 bg-blue-400 rounded-full -bottom-4 -left-4 opacity-10 animate-float lg:hidden" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;