"use client";
import { ReactNode, RefObject } from "react";

interface CarouselTrackProps {
  gap: number;
  trackRef: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}

export default function CarouselTrack({ gap, trackRef, children }: CarouselTrackProps) {
  return (
    <div className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex transition-transform duration-300 ease-out"
        style={{ gap: `${gap}px` }}
      >
        {children}
      </div>
    </div>
  );
}