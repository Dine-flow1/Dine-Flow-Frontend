"use client";
import { useState, useEffect } from "react";

export function useCarouselResponsive(
  defaultItemsPerView: number = 3,
  defaultCardWidth: number = 224,
  defaultGap: number = 24
) {
  const [windowWidth, setWindowWidth] = useState(1200);

  // Simple window resize handler
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial width

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive configuration
  const getResponsiveConfig = () => {
    if (windowWidth < 640) { // Mobile
      return {
        itemsPerView: 1,
        cardWidth: 280,
        gap: 16,
      };
    } else if (windowWidth < 768) { // Tablet small
      return {
        itemsPerView: 1,
        cardWidth: 320,
        gap: 20,
      };
    } else if (windowWidth < 1024) { // Tablet
      return {
        itemsPerView: 2,
        cardWidth: 240,
        gap: 20,
      };
    } else if (windowWidth < 1280) { // Desktop small
      return {
        itemsPerView: 3,
        cardWidth: 220,
        gap: 20,
      };
    } else { // Desktop large
      return {
        itemsPerView: defaultItemsPerView,
        cardWidth: defaultCardWidth,
        gap: defaultGap,
      };
    }
  };

  const responsiveConfig = getResponsiveConfig();
  const showNavigation = windowWidth >= 640;
  const showAutoPlayStatus = windowWidth >= 768;
  const enableActiveAnimations = windowWidth >= 1024;

  return {
    windowWidth,
    responsiveConfig,
    showNavigation,
    showAutoPlayStatus,
    enableActiveAnimations
  };
}