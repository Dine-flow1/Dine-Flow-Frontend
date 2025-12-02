import React from "react";
import HeroContent from "./HeroContent";
import HeroTrendingWrapper from "./HeroTrendingWrapper";

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
  textRef: React.RefObject<HTMLDivElement | null>;
  buttonsRef: React.RefObject<HTMLDivElement | null>;
  currentSlide: number;
  goToSlide: (idx: number) => void;
}

export default function HeroSlider({
  containerRef,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  textRef,
  buttonsRef,
  currentSlide,
  goToSlide,
}: Props) {
  return (
    <>
      <div ref={containerRef} className="flex w-full lg:hidden" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="w-full px-4 shrink-0">
          <HeroContent textRef={textRef} buttonsRef={buttonsRef} />
        </div>

        <div className="w-full px-4 shrink-0">
          <div className="flex flex-col justify-center min-h-[70vh]">
            <div className="relative">
              <div className="relative z-10">
                <HeroTrendingWrapper />
              </div>
              <div className="absolute w-8 h-8 bg-yellow-400 rounded-full -top-2 -right-2 opacity-5 animate-float" />
              <div className="absolute w-6 h-6 delay-1000 bg-blue-400 rounded-full -bottom-2 -left-2 opacity-5 animate-float" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 mt-4 lg:hidden">
        {[0, 1].map((index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-amber-500 w-6" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </>
  );
}
