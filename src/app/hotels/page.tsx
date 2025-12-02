"use client";
import { useEffect, useState, useMemo } from "react";
import Navbar from "../../components/ui/Navbar";
import RestaurantCard from "../../components/ui/RestaurandCard";
import Footer from "../../components/ui/Footer";
import { getRestaurants } from "../services/restaurantService";
import { RestaurantData } from "../../types/restaurant";

export default function HotelsPage() {
  const [restaurants, setRestaurants] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("All Cuisine");
  const [sortBy, setSortBy] = useState("name");

  // Fetch restaurants from backend
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching restaurants...");
      try {
        setLoading(true);
        const data = await getRestaurants();
        console.log("Fetched data:", data);
        setRestaurants(data);
      } catch (err: unknown) {
        console.error("Fetch error:", err);
        const message = err instanceof Error ? err.message : String(err);
        setError(message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get unique cuisines
  const cuisines = useMemo(() => {
    const allCuisines = restaurants.flatMap((r) => {
      if (Array.isArray(r.cuisine)) return r.cuisine;
      if (typeof r.cuisine === "string") return [r.cuisine];
      return r.restaurantType ? [r.restaurantType] : [];
    });
    return ["All Cuisine", ...(Array.from(new Set(allCuisines)) as string[])];
  }, [restaurants]);

  // Filter and sort restaurants
  const filteredRestaurants = useMemo(() => {
    return restaurants
      .filter((restaurant) => {
        const searchLower = searchTerm.toLowerCase();
        const cuisineString = Array.isArray(restaurant.cuisine)
          ? restaurant.cuisine.join(" ")
          : typeof restaurant.cuisine === "string"
          ? restaurant.cuisine
          : restaurant.restaurantType || "";

        const matchesSearch =
          (restaurant.restaurantName || "")
            .toLowerCase()
            .includes(searchLower) ||
          (restaurant.description || "").toLowerCase().includes(searchLower) ||
          (restaurant.address || "").toLowerCase().includes(searchLower) ||
          cuisineString.toLowerCase().includes(searchLower) ||
          (restaurant.restaurantType || "").toLowerCase().includes(searchLower);

        const matchesCuisine =
          selectedCuisine === "All Cuisine" ||
          (Array.isArray(restaurant.cuisine)
            ? restaurant.cuisine.includes(selectedCuisine)
            : typeof restaurant.cuisine === "string"
            ? restaurant.cuisine === selectedCuisine
            : restaurant.restaurantType === selectedCuisine);

        return matchesSearch && matchesCuisine;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name":
            return (a.restaurantName || "").localeCompare(
              b.restaurantName || ""
            );
          case "rating":
            return (b.rating || 0) - (a.rating || 0);
          case "deliveryTime":
            return (a.deliveryTime || 0) - (b.deliveryTime || 0);
          default:
            return 0;
        }
      });
  }, [restaurants, searchTerm, selectedCuisine, sortBy]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCuisine("All Cuisine");
    setSortBy("name");
  };

  if (loading)
    return <div className="text-center py-20">Loading restaurants...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      <section className="min-h-screen pt-16">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/28676383/pexels-photo-28676383.jpeg")',
            height: "60vh",
            minHeight: "500px",
          }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-5 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="mb-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
                Discover Amazing Restaurants 🍴
              </h1>
              <p className="max-w-2xl mx-auto mb-8 text-xl text-white md:text-2xl">
                Find the perfect dining experience with our curated collection
                of restaurants
              </p>
            </div>
          </div>
        </div>

        {/* Filters & Results */}
        <div className="px-5 py-10 mx-auto -mt-20 max-w-7xl relative z-20">
          {/* Filters */}
          <div className="p-6 mb-10 bg-white border border-yellow-100 shadow-xl rounded-2xl">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                <input
                  type="text"
                  placeholder="🔍 Search by restaurant, cuisine, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-6 py-3 border-2 border-yellow-200 rounded-full focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                />
                <select
                  value={selectedCuisine}
                  onChange={(e) => setSelectedCuisine(e.target.value)}
                  className="px-4 py-3 border-2 border-yellow-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                >
                  {cuisines.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border-2 border-yellow-200 rounded-xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100"
                >
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="deliveryTime">Sort by Delivery Time</option>
                </select>
              </div>
              <button
                onClick={resetFilters}
                className="px-6 py-3 font-medium text-yellow-700 bg-yellow-100 border-2 border-yellow-200 rounded-xl hover:bg-yellow-200 hover:border-yellow-300"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Results */}
          {filteredRestaurants.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mb-4 text-6xl">🍽️</div>
              <h3 className="mb-2 text-2xl font-semibold text-gray-700">
                No restaurants found
              </h3>
              <button
                onClick={resetFilters}
                className="px-8 py-3 font-medium text-white bg-yellow-500 rounded-xl hover:bg-yellow-600"
              >
                Show All Restaurants
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredRestaurants.map((r) => (
                <RestaurantCard key={r._id} restaurant={r} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
