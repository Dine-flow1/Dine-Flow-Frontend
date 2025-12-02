"use client";
import React, { useRef, useState, useCallback, useLayoutEffect } from "react";
import gsap from "gsap";
import HeroContent from "./Hero/HeroContent";
import HeroSlider from "./Hero/HeroSlider";
import HeroTrendingWrapper from "./Hero/HeroTrendingWrapper";
import useHeroAnimations from "./Hero/useHeroAnimations";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  useHeroAnimations(heroRef, textRef, buttonsRef);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) setCurrentSlide((p) => (p + 1) % 2);
    else if (isRightSwipe) setCurrentSlide((p) => (p - 1 + 2) % 2);
  }, [touchStart, touchEnd]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
    gsap.to(containerRef.current, { x: `-${currentSlide * 100}%`, duration: 0.5, ease: "power2.out" });
  }, [currentSlide]);

  return (
    <section ref={heroRef} className="flex items-center min-h-screen pt-16 pb-8 overflow-hidden bg-linear-to-br from-white via-blue-50/30 to-purple-50/30 lg:pt-20 lg:pb-0">
      <HeroSlider
        containerRef={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        textRef={textRef}
        buttonsRef={buttonsRef}
        currentSlide={currentSlide}
        goToSlide={(i) => setCurrentSlide(i)}
      />

      <div className="container items-center hidden gap-6 px-4 mx-auto lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="flex flex-col justify-center order-2 lg:order-1">
          <div ref={textRef} className="space-y-4 md:space-y-6 lg:space-y-8">
            <HeroContent textRef={textRef} buttonsRef={buttonsRef} />
          </div>
        </div>

        <div className="relative order-1 lg:order-2">
          <div className="relative z-10">
            <HeroTrendingWrapper />
          </div>
        </div>
      </div>
    </section>
  );
}