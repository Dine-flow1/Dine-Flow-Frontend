"use client";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

interface TrendingItem {
  id: number;
  name: string;
  icon: string;
  rating: number;
  orders: number;
  trending?: boolean;
}

const trendingItems: TrendingItem[] = [
  { id: 1, name: "Lobster Bisque", icon: "🦞", rating: 4.8, orders: 215 },
  { id: 2, name: "Grilled Salmon", icon: "🐟", rating: 4.8, orders: 342 },
  { id: 3, name: "Truffle Pasta", icon: "🍝", rating: 4.9, orders: 298, trending: true },
  { id: 4, name: "Wagyu Steak", icon: "🥩", rating: 4.7, orders: 189 },
  { id: 5, name: "Chocolate Cake", icon: "🍰", rating: 4.9, orders: 256 },
  { id: 6, name: "Caesar Salad", icon: "🥗", rating: 4.6, orders: 178 },
];

export default function TrendingSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const itemsPerView = 3;
  const gap = 24;
  const cardWidth = 224; // w-56 = 224px

  // Calculate total width including gap
  const itemWidth = cardWidth + gap;

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
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.to(trackRef.current, {
      x: -currentIndex * itemWidth,
      duration: 0.6,
      ease: "power2.out",
    });

    // Add active card animation
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

  }, [currentIndex, itemWidth]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev >= trendingItems.length - itemsPerView ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev => 
      prev === 0 ? trendingItems.length - itemsPerView : prev - 1
    );
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

  return (
    <section 
      className="py-12 text-center bg-transparent"
      onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
    >
      <div className="px-4 mx-auto max-w-7xl" ref={containerRef}>
        {/* Heading */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-[#3b2600] flex items-center justify-center gap-3 mb-4"
          >
            <span className="text-3xl text-amber-500">⚡</span> 
            Trending Now
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Most popular items loved by customers
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 transition-all duration-200 -translate-x-4 -translate-y-1/2 border rounded-full shadow-lg top-1/2 bg-white/90 backdrop-blur-sm border-amber-200 hover:bg-white hover:scale-110 group"
            aria-label="Previous slides"
          >
            <ChevronLeft className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 transition-all duration-200 translate-x-4 -translate-y-1/2 border rounded-full shadow-lg top-1/2 bg-white/90 backdrop-blur-sm border-amber-200 hover:bg-white hover:scale-110 group"
            aria-label="Next slides"
          >
            <ChevronRight className="w-5 h-5 text-amber-600 group-hover:text-amber-700" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex transition-transform duration-300 ease-out"
              style={{ gap: `${gap}px` }}
            >
              {trendingItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  whileHover={{ scale: 1.05, y: -8 }}
                  className="w-56 p-6 transition-all duration-300 bg-white border-2 shadow-lg shrink-0 border-amber-100/80 rounded-3xl hover:shadow-2xl backdrop-blur-sm"
                  style={{ 
                    minWidth: `${cardWidth}px`,
                    background: 'linear-gradient(135deg, #fff 0%, #fefce8 100%)'
                  }}
                >
                  {item.trending && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full shadow-lg bg-linear-to-r from-red-500 to-orange-500 top-4 right-4"
                    >
                      🔥 Trending
                    </motion.span>
                  )}

                  <motion.div 
                    className="mb-4 text-5xl"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {item.icon}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-[#3b2600] mb-3 font-serif">
                    {item.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < Math.floor(item.rating) 
                            ? "text-amber-400 fill-amber-400" 
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-semibold text-gray-600">
                      {item.rating.toFixed(1)}
                    </span>
                  </div>

                  {/* Orders */}
                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-amber-600">{item.orders}+</span> orders today
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-3 mt-12">
            {Array.from({ length: trendingItems.length - itemsPerView + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-amber-600 w-8" 
                    : "bg-amber-200 w-2 hover:bg-amber-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Status */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-xs text-gray-500">
              {isAutoPlaying ? 'Auto-playing' : 'Paused'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}