"use client";
import { use, useState, useEffect } from "react";
import { RestaurantData, MenuItem } from "@/types/restaurant";
import Navbar from "@/components/ui/Navbar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import OrderAndBookingSection from "@/components/ui/OrderAndBookingSection";
import { apiService } from "@/lib/apiService";

export default function RestaurantDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  console.log("Restaurant ID:", id);

  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);

        const restaurantData = await apiService.getRestaurant(id);
        if (!restaurantData) {
          setError("Restaurant not found");
          return;
        }

        setRestaurant(restaurantData);

        const menuData = await apiService.getMenuItems(id);
        setMenuItems(menuData);
      } catch (err: any) {
        setError(err.message || "Failed to load restaurant");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen py-10 bg-linear-to-br from-yellow-50 to-amber-50">
          <div className="max-w-6xl px-6 mx-auto text-center">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-gray-600">Loading restaurant details...</p>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Restaurant Not Found</h1>
          <p className="text-gray-600 mb-8">
            We couldn't find the restaurant you're looking for. It may have been removed or doesn't exist.
          </p>
          <a 
            href="/restaurants" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Browse Restaurants
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen py-10 bg-linear-to-br from-yellow-50 to-amber-50">
          <div className="max-w-6xl px-6 mx-auto text-center">
            <div className="mb-4 text-6xl">😔</div>
            <h1 className="mb-4 text-2xl font-bold text-gray-800">{error || "Restaurant not found"}</h1>
            <p className="text-gray-600 mb-6">Unable to fetch restaurant details.</p>

            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-7 bg-linear-to-br from-yellow-50 to-amber-50">
        <div className="max-w-6xl px-6 mx-auto">
          <OrderAndBookingSection restaurant={restaurant} menuItems={menuItems} />
        </div>
      </div>
    </div>
  );
}