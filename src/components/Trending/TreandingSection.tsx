"use client";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import Carousel from "./Carousel";
import TrendingCard from "../Trending//TrendingCard";
import { TrendingItem } from "../../types/Trending";

const trendingItems: TrendingItem[] = [
  { id: 1, name: "Lobster Bisque", icon: "🦞", rating: 4.8, orders: 215 },
  { id: 2, name: "Grilled Salmon", icon: "🐟", rating: 4.8, orders: 342 },
  { id: 3, name: "Truffle Pasta", icon: "🍝", rating: 4.9, orders: 298, trending: true },
  { id: 4, name: "Wagyu Steak", icon: "🥩", rating: 4.7, orders: 189 },
  { id: 5, name: "Chocolate Cake", icon: "🍰", rating: 4.9, orders: 256 },
  { id: 6, name: "Caesar Salad", icon: "🥗", rating: 4.6, orders: 178 },
];

export default function TrendingSection() {
  return (
    <section className="py-12 text-center bg-transparent">
      <div className="px-4 mx-auto max-w-7xl">
        <SectionHeader 
          title="Trending Now"
          subtitle="Most popular items loved by customers"
          icon="⚡"
        />

        <Carousel items={trendingItems}>
          {trendingItems.map((item, index) => (
            <TrendingCard key={item.id} item={item} index={index} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}