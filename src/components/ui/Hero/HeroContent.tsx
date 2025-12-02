import React from "react";
import Button from "../Buttons";

interface Props {
  textRef: React.RefObject<HTMLDivElement | null>;
  buttonsRef: React.RefObject<HTMLDivElement | null>;
}

export default function HeroContent({ textRef, buttonsRef }: Props) {
  return (
    <div className="flex flex-col justify-center min-h-[70vh]">
      <div ref={textRef} className="space-y-4 md:space-y-6">
        <div className="inline-flex items-center px-3 py-1.5 space-x-2 text-xs font-semibold border rounded-full bg-linear-to-r from-primary-50 to-blue-50 text-primary-700 border-primary-200 md:px-4 md:py-2 md:text-sm">
          <span>✨</span>
          <span>The Future of Restaurant Management</span>
        </div>

        <h1 className="font-serif text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl">
          Grow Your Restaurant{" "}
          <span className="block text-transparent bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text">
            Business with Ease
          </span>
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg md:text-xl lg:text-lg xl:text-xl sm:leading-loose">
          Streamline your operations, increase efficiency, and boost profits
          with our comprehensive management platform designed for modern
          restaurants.
        </p>

        <div ref={buttonsRef} className="flex flex-col gap-3 pt-2 sm:flex-row sm:gap-4 md:pt-4">
          <Button variant="primary" onClick={() => (window.location.href = "/register")}>Register Your Restaurant Now</Button>
        </div>

        <div className="pt-4 md:block lg:pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 border-2 border-white rounded-full bg-linear-to-r from-amber-400 to-amber-600" />
                ))}
              </div>
              <span>500+ restaurants trust us</span>
            </div>
            <div className="items-center hidden gap-2 text-sm text-gray-600 lg:flex">
              <span>⭐️⭐️⭐️⭐️⭐️</span>
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
