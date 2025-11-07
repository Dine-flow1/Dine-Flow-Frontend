"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

export default function CarouselNavigation({ onPrev, onNext }: CarouselNavigationProps) {
  return (
    <>
      <button
        onClick={onPrev}
        className="absolute left-0 z-10 flex items-center justify-center w-8 h-8 transition-all duration-200 -translate-x-2 -translate-y-1/2 border rounded-full shadow-lg md:w-10 md:h-10 md:-translate-x-4 top-1/2 bg-white/90 backdrop-blur-sm border-amber-200 hover:bg-white hover:scale-110 group"
        aria-label="Previous slides"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-amber-600 group-hover:text-amber-700" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-0 z-10 flex items-center justify-center w-8 h-8 transition-all duration-200 translate-x-2 -translate-y-1/2 border rounded-full shadow-lg md:w-10 md:h-10 md:translate-x-4 top-1/2 bg-white/90 backdrop-blur-sm border-amber-200 hover:bg-white hover:scale-110 group"
        aria-label="Next slides"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-amber-600 group-hover:text-amber-700" />
      </button>
    </>
  );
}