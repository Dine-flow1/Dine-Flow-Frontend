// app/hotels/page.tsx
"use client"
import { useState, useMemo } from "react";
import Navbar from "@/src/components/Navbar";
import RestaurantCard from "../../components/RestaurandCard";
import { restaurants } from "../../data/restaurants";
import { RestaurantData } from "../../types/restruant";

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisine");
  const [sortBy, setSortBy] = useState("name");

  // Get unique cuisines from restaurants
  const cuisines = useMemo(() => {
    const allCuisines = restaurants.flatMap((r: RestaurantData) => {
      // Handle cuisine which can be ReactNode - safely convert to string array
      if (Array.isArray(r.cuisine)) {
        return r.cuisine;
      }
      if (typeof r.cuisine === 'string') {
        return [r.cuisine];
      }
      // If cuisine is ReactNode or other type, use restaurantType as fallback
      return r.restaurantType ? [r.restaurantType] : [];
    });
    return ["All Cuisine", ...Array.from(new Set(allCuisines)) as string[]];
  }, []);

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants.filter((restaurant: RestaurantData) => {
      const searchLower = searchTerm.toLowerCase();
      
      // Safely convert cuisine to string for searching
      let cuisineString = '';
      if (Array.isArray(restaurant.cuisine)) {
        cuisineString = restaurant.cuisine.join(' ');
      } else if (typeof restaurant.cuisine === 'string') {
        cuisineString = restaurant.cuisine;
      } else {
        cuisineString = restaurant.restaurantType || '';
      }
      
      const matchesSearch = 
        (restaurant.restaurantName || '').toLowerCase().includes(searchLower) ||
        (restaurant.name || '').toLowerCase().includes(searchLower) ||
        (restaurant.description || '').toLowerCase().includes(searchLower) ||
        (restaurant.address || '').toLowerCase().includes(searchLower) ||
        // (restaurant.location || '').toLowerCase().includes(searchLower) ||
        cuisineString.toLowerCase().includes(searchLower) ||
        (restaurant.restaurantType || '').toLowerCase().includes(searchLower);
      
      const matchesCuisine = 
        selectedCuisine === "All Cuisine" || 
        (Array.isArray(restaurant.cuisine) 
          ? restaurant.cuisine.includes(selectedCuisine)
          : (typeof restaurant.cuisine === 'string' 
              ? restaurant.cuisine === selectedCuisine
              : restaurant.restaurantType === selectedCuisine));
      
      return matchesSearch && matchesCuisine;
    });

    // Sort restaurants
    filtered.sort((a: RestaurantData, b: RestaurantData) => {
      switch (sortBy) {
        case "name":
          return (a.restaurantName || a.name || '').localeCompare(b.restaurantName || b.name || '');
        case "rating":
          return 0;
        case "deliveryTime":
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCuisine, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCuisine("All Cuisine");
    setSortBy("name");
  };

  return (
  <>
    <section className="min-h-screen bg-linear-to-br from-yellow-50 to-amber-50">
  <Navbar/>
      <div className="px-5 py-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-800 py-7 md:text-5xl">
            Discover Amazing Restaurants 🍴
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Find the perfect dining experience with our curated collection of restaurants
          </p>
        </div>

        {/* Filters Section */}
        <div className="p-6 mb-10 bg-white border border-yellow-100 shadow-lg rounded-2xl">
          <div className="flex flex-col gap-6">
            {/* Search and Filters Row */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
              {/* Search Input */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="🔍 Search by restaurant, cuisine, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-6 py-3 transition-all duration-200 border-2 border-yellow-200 rounded-full outline-none focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                  />
                </div>
              </div>

              {/* Cuisine Filter */}
              <div className="flex gap-4">
                <select 
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="px-4 py-3 transition-all duration-200 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                >
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>{cuisine}</option>
                  ))}
                </select>

                {/* Sort Filter */}
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 transition-all duration-200 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                >
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="deliveryTime">Sort by Delivery Time</option>
                </select>
              </div>
            </div>

            {/* Actions Row */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-semibold text-yellow-600">{filteredRestaurants.length}</span> restaurants
                {searchTerm && (
                  <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
                )}
                {selectedCuisine !== "All Cuisine" && (
                  <span> in <span className="font-semibold">{selectedCuisine}</span></span>
                )}
              </div>
              
              <button 
                onClick={resetFilters}
                className="px-6 py-3 font-medium text-yellow-700 transition-colors duration-200 bg-yellow-100 border-2 border-yellow-200 rounded-xl hover:bg-yellow-200 hover:border-yellow-300"
                >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredRestaurants.length === 0 ? (
          <div className="py-16 text-center">
            <div className="mb-4 text-6xl">🍽️</div>
            <h3 className="mb-2 text-2xl font-semibold text-gray-700">No restaurants found</h3>
            <p className="mb-6 text-gray-500">Try adjusting your search or filters</p>
            <button 
              onClick={resetFilters}
              className="px-8 py-3 font-medium text-white transition-colors duration-200 bg-yellow-500 rounded-xl hover:bg-yellow-600"
            >
              Show All Restaurants
            </button>
          </div>
        ) : (
          <>
            {/* Restaurant Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredRestaurants.map((restaurant: RestaurantData, index: number) => (
                <RestaurantCard 
                key={`${restaurant.id}-${index}`} 
                restaurant={restaurant} 
                />
              ))}
            </div>

            {/* Load More Button (Optional) */}
            <div className="mt-12 text-center">
              <button className="px-8 py-3 font-medium text-yellow-700 transition-colors duration-200 bg-yellow-100 border-2 border-yellow-200 rounded-xl hover:bg-yellow-200 hover:border-yellow-300">
                Load More Restaurants
              </button>
            </div>
          </>
        )}
      </div>
    </section>
        </>
  );
}