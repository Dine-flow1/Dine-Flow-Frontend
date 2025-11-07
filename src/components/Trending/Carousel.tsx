"use client";
import { CarouselProps } from "../../types/CarouselTrending";
import CarouselNavigation from "./carouselNavigation";
import CarouselIndicators from "./CarouselIndicators";
import AutoPlayStatus from "./AutoPlayStatus";
import CarouselTrack from "./CarouselTrack";
import { useCarouselResponsive } from "../../hooks/useCarouselResponsive";
import { useCarouselState } from "../../hooks/useCarouselState";
import { useCarouselAnimations } from "../../hooks/useCarouselAnimations";

export default function Carousel({ 
  items, 
  itemsPerView = 3, 
  gap = 24, 
  cardWidth = 224,
  autoPlayInterval = 4000,
  children 
}: CarouselProps & { children: React.ReactNode }) {
  
  // Responsive logic
  const { 
    responsiveConfig, 
    showNavigation, 
    showAutoPlayStatus, 
    enableActiveAnimations 
  } = useCarouselResponsive(itemsPerView, cardWidth, gap);

  const { itemsPerView: currentItemsPerView, cardWidth: currentCardWidth, gap: currentGap } = responsiveConfig;
  const itemWidth = currentCardWidth + currentGap;

  // Carousel state management
  const {
    currentIndex,
    isAutoPlaying,
    nextSlide,
    prevSlide,
    goToSlide,
    handleMouseEnter,
    handleMouseLeave
  } = useCarouselState({
    items,
    responsiveConfig,
    autoPlayInterval
  });

  // Carousel animations
  const {
    trackRef,
    containerRef,
    cardsRef
  } = useCarouselAnimations({
    currentIndex,
    itemsPerView: currentItemsPerView,
    itemWidth,
    enableActiveAnimations
  });

  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {showNavigation && (
        <CarouselNavigation onPrev={prevSlide} onNext={nextSlide} />
      )}
      
      <CarouselTrack gap={currentGap} trackRef={trackRef}>
        {children}
      </CarouselTrack>

      <CarouselIndicators 
        totalSlides={items.length}
        currentIndex={currentIndex}
        onSlideChange={goToSlide}
        itemsPerView={currentItemsPerView}
      />

      {showAutoPlayStatus && (
        <AutoPlayStatus isAutoPlaying={isAutoPlaying} />
      )}
    </div>
  );
}