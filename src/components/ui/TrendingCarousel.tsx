'use client';

import { useEffect, useState } from "react";
import { Star, TrendingUp } from "lucide-react";

const trendingItems = [
  { id: 1, name: "Grilled Salmon", emoji: "🐟", rating: 4.8, orders: 342 },
  { id: 2, name: "Truffle Pasta", emoji: "🍝", rating: 4.9, orders: 298 },
  { id: 3, name: "Wagyu Steak", emoji: "🥩", rating: 4.7, orders: 267 },
  { id: 4, name: "Chocolate Cake", emoji: "🍰", rating: 4.9, orders: 456 },
  { id: 5, name: "Caesar Salad", emoji: "🥗", rating: 4.6, orders: 189 },
  { id: 6, name: "Lobster Bisque", emoji: "🦞", rating: 4.8, orders: 215 },
];

export default function TrendingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isAutoPlay || !isMounted) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingItems.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, isMounted]);

  const getVisibleItems = () => {
    const items = [];
    for (let i = 0; i < 3; i++) {
      items.push(trendingItems[(currentIndex + i) % trendingItems.length]);
    }
    return items;
  };

  // Prevent rendering until mounted to avoid hydration issues
  if (!isMounted) {
    return (
      <div className="w-full">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-6 h-6 text-gold-600" />
            <h3 className="text-2xl font-bold text-foreground">Trending Now</h3>
          </div>
          <p className="text-gray-600">Most popular items loved by customers</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="p-6 border-2 rounded-2xl bg-gradient-to-br from-white to-gold-50 border-gold-200 animate-pulse"
            >
              <div className="w-16 h-16 mb-4 bg-gray-300 rounded-full"></div>
              <div className="w-3/4 h-6 mb-3 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const visibleItems = getVisibleItems();

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Carousel Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-6 h-6 text-gold-600" />
          <h3 className="text-2xl font-bold text-foreground">Trending Now</h3>
        </div>
        <p className="text-gray-600">Most popular items loved by customers</p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Items Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <div
              key={`${item.id}-${currentIndex}-${index}`}
              className="relative p-6 transition-all duration-500 border-2 cursor-pointer group rounded-2xl bg-gradient-to-br from-white to-gold-50 border-gold-200 hover:border-gold-400 hover:shadow-xl"
            >
              {/* Badge */}
              <div className="absolute -top-3 right-4">
                <div className="flex items-center gap-1 px-3 py-1 text-xs font-bold text-white rounded-full shadow-lg bg-wine-500">
                  <TrendingUp className="w-3 h-3" />
                  Trending
                </div>
              </div>

              {/* Food Emoji */}
              <div className="mb-4 text-6xl transition-transform group-hover:scale-110">
                {item.emoji}
              </div>

              {/* Item Name */}
              <h4 className="mb-3 text-lg font-bold transition-colors text-foreground group-hover:text-gold-600">
                {item.name}
              </h4>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.rating)
                          ? "fill-gold-400 text-gold-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700">
                  {item.rating}
                </span>
              </div>

              {/* Orders Count */}
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gold-600">{item.orders}</span> orders today
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 transition-opacity pointer-events-none rounded-2xl bg-gradient-to-t from-gold-500/0 to-wine-500/0 group-hover:from-gold-500/5 group-hover:to-wine-500/5" />
            </div>
          ))}
        </div>

        {/* Carousel Controls - Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {trendingItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-3 h-3 bg-gold-600"
                  : "w-2 h-2 bg-gold-300 hover:bg-gold-400"
              }`}
              aria-label={`Go to item ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            setCurrentIndex((prev) =>
              prev === 0 ? trendingItems.length - 1 : prev - 1
            )
          }
          className="absolute left-0 flex items-center justify-center w-10 h-10 transition-colors -translate-x-12 -translate-y-1/2 rounded-full top-1/2 bg-gold-100 hover:bg-gold-200 md:flex"
          aria-label="Previous items"
        >
          <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => setCurrentIndex((prev) => (prev + 1) % trendingItems.length)}
          className="absolute right-0 flex items-center justify-center w-10 h-10 transition-colors translate-x-12 -translate-y-1/2 rounded-full top-1/2 bg-gold-100 hover:bg-gold-200 md:flex"
          aria-label="Next items"
        >
          <svg className="w-6 h-6 text-gold-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Info Text */}
      <p className="mt-6 text-sm text-center text-gray-500">
        Click cards or use dots to browse trending items
      </p>
    </div>
  );
}