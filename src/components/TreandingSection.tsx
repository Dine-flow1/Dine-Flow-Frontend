"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

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
];

export default function TrendingNow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-16 bg-[#fffaf3] text-center">
      <div className="max-w-6xl px-4 mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#3b2600] flex items-center justify-center gap-2">
            <span className="text-yellow-500">⚡</span> Trending Now
          </h2>
          <p className="text-gray-500">Most popular items loved by customers</p>
        </div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-8">
          {trendingItems.map((item, i) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              className="relative w-64 p-6 transition-all bg-white border border-yellow-100 shadow-md rounded-2xl hover:shadow-xl"
            >
              {item.trending && (
                <span className="absolute px-3 py-1 text-sm text-white bg-red-500 rounded-full shadow-md top-3 right-3">
                  🔥 Trending
                </span>
              )}

              <div className="mb-4 text-5xl">{item.icon}</div>
              <h3 className="text-lg font-semibold text-[#3b2600] mb-2">{item.name}</h3>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 ${idx < Math.floor(item.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-1 text-sm text-gray-500">{item.rating.toFixed(1)}</span>
              </div>

              {/* Orders */}
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-yellow-600">{item.orders}</span> orders today
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-10">
          {trendingItems.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-3 w-3 rounded-full transition-all ${
                i === currentIndex ? "bg-yellow-600 w-6" : "bg-yellow-200"
              }`}
            />
          ))}
        </div>

        <p className="mt-4 text-sm text-gray-400">
          Click cards or use dots to browse trending items
        </p>
      </div>
    </section>
  );
}
