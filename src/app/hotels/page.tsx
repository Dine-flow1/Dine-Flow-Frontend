// app/hotels/page.tsx
"use client"
import { useState, useMemo } from "react";
import Navbar from "../../components/ui/Navbar";
import RestaurantCard from "../../components/ui/RestaurandCard";
import Footer from "../../components/ui/Footer"; // Import your Footer component
import { restaurants } from "../../data/restaurants";
// import { RestaurantData } from "../../types/restaurant";

export default function HotelsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisine");
  const [sortBy, setSortBy] = useState("name");

  // Get unique cuisines from restaurants
  const cuisines = useMemo(() => {
    const allCuisines = restaurants.flatMap((r) => {
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
    let filtered = restaurants.filter((restaurant) => {
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
        (restaurant.description || '').toLowerCase().includes(searchLower) ||
        (restaurant.address || '').toLowerCase().includes(searchLower) ||
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
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return (a.restaurantName || '').localeCompare(b.restaurantName || '');
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
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Add padding-top to account for fixed navbar */}
      <section className="min-h-screen pt-16"> {/* Adjust pt-16 based on your navbar height */}
        
        {/* Hero Section with Background Image */}
        <div 
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/28676383/pexels-photo-28676383.jpeg")',
            height: '60vh',
            minHeight: '500px'
          }}
        >
          {/* Dark Overlay for better text readability */}
          {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}
          
          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                Discover Amazing Restaurants 🍴
              </h1>
              <p className="max-w-2xl mx-auto mb-8 text-xl text-white md:text-2xl">
                Find the perfect dining experience with our curated collection of restaurants
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-5 py-10 mx-auto -mt-20 max-w-7xl relative z-20">
          {/* Filters Section */}
          <div className="p-6 mb-10 bg-white border border-yellow-100 shadow-xl rounded-2xl">
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
                {filteredRestaurants.map((restaurant: any, index: number) => (
                  <RestaurantCard 
                    key={`${restaurant.id}-${index}`} 
                    restaurant={{
                      _id: restaurant.id?.toString() ?? `${restaurant.restaurantName}-${index}`,
                      ...restaurant,
                      ownerId: typeof restaurant.owner === "string"
                        ? restaurant.owner
                        : restaurant.owner?.email ?? "",
                      phone: "phone" in restaurant ? (restaurant as any).phone ?? "" : "",
                      email: "email" in restaurant ? (restaurant as any).email ?? "" : "",
                      openingHours: restaurant.openingHours ?? "",
                      menu: Array.isArray(restaurant.menu)
                        ? restaurant.menu.map((item: any, idx: number) => ({
                            id: typeof item.id === "string" ? item.id : item.id?.toString() ?? `${restaurant.id}-menu-${idx}`,
                            _id: typeof item.id === "string" ? item.id : item.id?.toString() ?? `${restaurant.id}-menu-${idx}`,
                            restaurantId: restaurant.id?.toString() ?? "",
                            categoryId: typeof item.categoryId === "string" ? item.categoryId : "",
                            isAvailable: typeof item.isAvailable === "boolean" ? item.isAvailable : true,
                            name: typeof item.name === "string" ? item.name : "",
                            price: typeof item.price === "number" ? item.price : 0,
                            image: typeof item.image === "string" ? item.image : "",
                            description: typeof item.description === "string" ? item.description : "",
                            category: typeof item.category === "string" ? item.category : "",
                            isVeg: typeof item.isVeg === "boolean" ? item.isVeg : false,
                            spiceLevel: typeof item.spiceLevel === "string" ? item.spiceLevel : "Mild",
                            discount: typeof item.discount === "number" ? item.discount : 0,
                            tags: Array.isArray(item.tags) ? item.tags : [],
                            rating: typeof item.rating === "number" ? item.rating : 0,
                          }))
                        : [],
                      reviews: "reviews" in restaurant ? (restaurant as any).reviews ?? [] : [],
                    }} 
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

      {/* Footer Component */}
      <Footer />
    </>
  );
}