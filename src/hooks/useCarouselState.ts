"use client";
import { useState, useEffect } from "react";
import { ResponsiveConfig } from "../types/CarouselTrending";

interface UseCarouselStateProps {
  items: any[];
  responsiveConfig: ResponsiveConfig;
  autoPlayInterval: number;
}

export function useCarouselState({ 
  items, 
  responsiveConfig, 
  autoPlayInterval 
}: UseCarouselStateProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const { itemsPerView: currentItemsPerView } = responsiveConfig;

  // Reset to first slide when screen size changes to prevent empty space
  useEffect(() => {
    setCurrentIndex(0);
  }, [responsiveConfig]);

  // Update current index when itemsPerView changes to prevent index out of bounds
  useEffect(() => {
    if (currentIndex > items.length - currentItemsPerView) {
      setCurrentIndex(Math.max(0, items.length - currentItemsPerView));
    }
  }, [currentItemsPerView, items.length, currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex, autoPlayInterval]);

  const nextSlide = () => {
    setCurrentIndex(prev => {
      const maxIndex = Math.max(0, items.length - currentItemsPerView);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex(prev => {
      const maxIndex = Math.max(0, items.length - currentItemsPerView);
      return prev === 0 ? maxIndex : prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return {
    currentIndex,
    isAutoPlaying,
    setCurrentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    handleMouseEnter,
    handleMouseLeave
  };
}