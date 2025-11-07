"use client";
import { useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";

interface UseCarouselAnimationsProps {
  currentIndex: number;
  itemsPerView: number;
  itemWidth: number;
  enableActiveAnimations: boolean;
}

export function useCarouselAnimations({
  currentIndex,
  itemsPerView,
  itemWidth,
  enableActiveAnimations
}: UseCarouselAnimationsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  // Initial animation - stagger cards
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current.length > 0) {
        gsap.fromTo(
          cardsRef.current,
          { 
            scale: 0, 
            opacity: 0, 
            y: 100, 
            rotation: -5 
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.3,
            ease: "back.out(1.7)",
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Carousel animation
  useEffect(() => {
    if (!trackRef.current) return;
    
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.to(trackRef.current, {
      x: -currentIndex * itemWidth,
      duration: 0.6,
      ease: "power2.out",
    });

    // Add active card animation (only on desktop)
    if (enableActiveAnimations) {
      const activeCards = cardsRef.current.slice(currentIndex, currentIndex + itemsPerView);
      activeCards.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            delay: index * 0.1,
            ease: "back.out(1.7)",
          });
        }
      });

      // Reset other cards
      cardsRef.current.forEach((card, index) => {
        if (card && (index < currentIndex || index >= currentIndex + itemsPerView)) {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        }
      });
    }

  }, [currentIndex, itemWidth, itemsPerView, enableActiveAnimations]);

  return {
    trackRef,
    containerRef,
    cardsRef
  };
}