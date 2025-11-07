"use client";

interface CarouselIndicatorsProps {
  totalSlides: number;
  currentIndex: number;
  onSlideChange: (index: number) => void;
  itemsPerView: number;
}

export default function CarouselIndicators({ 
  totalSlides, 
  currentIndex, 
  onSlideChange, 
  itemsPerView 
}: CarouselIndicatorsProps) {
  const totalIndicators = Math.max(1, totalSlides - itemsPerView + 1);
  
  return (
    <div className="flex justify-center gap-2 mt-8 md:mt-12">
      {Array.from({ length: totalIndicators }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSlideChange(index)}
          className={`transition-all duration-300 ${
            index === currentIndex 
              ? "bg-amber-600 w-6 md:w-8 h-2" 
              : "bg-amber-200 w-2 h-2 hover:bg-amber-300"
          } rounded-full`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}