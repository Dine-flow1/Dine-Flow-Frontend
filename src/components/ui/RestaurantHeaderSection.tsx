import React from "react";
import { RestaurantData } from "@/types/restaurant";

interface RestaurantHeaderSectionProps {
  restaurant: RestaurantData;
  onMenuClick?: () => void;
  onBookClick?: () => void;
}

const RestaurantHeaderSection: React.FC<RestaurantHeaderSectionProps> = ({ restaurant, onMenuClick, onBookClick }) => {
  return (
    <div className="mb-8">
      <a href="/hotels" className="text-yellow-700 text-lg mb-2 inline-block hover:underline">&larr; Back to Hotels</a>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">{restaurant.restaurantName || restaurant.name}</h1>
      <div className="flex items-center gap-4 mb-2">
        <span className="text-red-500 text-xl">&#x1F4CD;</span>
        <span className="text-lg text-gray-700">{restaurant.location || restaurant.address}</span>
      </div>
      {restaurant.phone && (
        <div className="flex items-center gap-4 mb-4">
          <span className="text-yellow-600 text-xl">&#x1F4DE;</span>
          <span className="text-lg text-gray-700">{restaurant.phone}</span>
        </div>
      )}
      <div className="flex gap-4 mb-6">
        <button
          onClick={onMenuClick}
          className="bg-yellow-700 text-white text-lg font-semibold px-8 py-4 rounded-xl shadow hover:bg-yellow-800 flex items-center gap-2"
        >
          <span role="img" aria-label="menu">🍽️</span> Menu &amp; Order
        </button>
        <button
          onClick={onBookClick}
          className="bg-white text-yellow-700 text-lg font-semibold px-8 py-4 rounded-xl border-2 border-yellow-400 shadow hover:bg-yellow-50 flex items-center gap-2"
        >
          <span role="img" aria-label="table">🪑</span> Book a Table
        </button>
      </div>
    </div>
  );
};

export default RestaurantHeaderSection;
