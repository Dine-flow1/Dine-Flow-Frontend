// components/RestaurantCard.tsx
import Link from "next/link";
import { RestaurantData } from "@/src/types/restruant";

interface RestaurantCardProps {
  restaurant: RestaurantData;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  // Safe access to properties with fallbacks
  const restaurantName = restaurant.restaurantName || restaurant.name || "Restaurant";
  const restaurantImage = restaurant.image as string || "/api/placeholder/400/300";
  const restaurantType = restaurant.restaurantType || "Multi-cuisine";
  const restaurantAddress = restaurant.address || restaurant.location || "Location not specified";
  const restaurantDescription = restaurant.description || "Experience the finest dining with authentic flavors and exceptional service.";

  return (
    <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-lg rounded-2xl hover:shadow-xl hover:-translate-y-1">
      {/* Restaurant Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={restaurantImage}
          alt={restaurantName}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        {/* Rating Badge */}
        <div className="absolute px-2 py-1 rounded-full shadow-sm top-3 right-3 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-semibold text-gray-800">4.2</span>
          </div>
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="p-5">
        {/* Name and Rating */}
        <div className="flex items-start justify-between mb-3">
          <h3 className="pr-2 text-xl font-bold text-gray-900">
            {restaurantName}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-lg text-yellow-500">⭐</span>
            <span className="font-semibold text-gray-800">4.2</span>
            <span className="text-xs text-gray-500">(1.2k)</span>
          </div>
        </div>

        {/* Reviews Count */}
        <p className="mb-3 text-sm text-gray-600">
          <span className="font-medium">1,247 reviews</span> from satisfied customers
        </p>

        {/* Category */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
            {restaurantType}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 mb-3 text-gray-600">
          <span className="text-lg">📍</span>
          <span className="text-sm">{restaurantAddress}</span>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-gray-700 line-clamp-2">
          {restaurantDescription}
        </p>

        {/* Delivery Time */}
        <div className="flex items-center gap-2 pt-4 mb-3 text-sm text-gray-600 border-t border-gray-100">
          <span className="text-green-600">🛵</span>
          <span>25-35 mins • 2.5 km</span>
        </div>

        {/* View Menu Button - Now on its own line and larger */}
        <Link 
          href={`/restuarants/${restaurant.id}`}
          className="flex items-center justify-center w-full py-3 text-base font-semibold text-white transition-colors duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600 hover:shadow-md"
        >
          View Menu
        </Link>
      </div>
    </div>
  );
}