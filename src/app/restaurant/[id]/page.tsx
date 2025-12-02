"use client";

import { useState, useEffect, use } from "react";
import { apiService } from "../../../lib/apiService";
import { RestaurantData, MenuItem } from "../../../types/restaurant";
import Navbar from "../../../components/ui/Navbar";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import OrderAndBookingSection from "../../../components/ui/OrderAndBookingSection";

export default function RestaurantDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        setError(null);
        const restaurantData = await apiService.getRestaurant(id);
        if (!restaurantData) {
          setError('Restaurant not found');
          setRestaurant(null);
        } else {
          setRestaurant(restaurantData);
        }
        const menuData = await apiService.getMenuItems(id);
        setMenuItems(menuData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load restaurant');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchRestaurantData();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen py-10 bg-linear-to-br from-yellow-50 to-amber-50">
          <div className="max-w-6xl px-6 mx-auto text-center">
            <LoadingSpinner />
            <p className="mt-4 text-lg text-gray-600">Loading restaurant details.......</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !restaurant) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen py-10 bg-linear-to-br from-yellow-50 to-amber-50">
          <div className="max-w-6xl px-6 mx-auto text-center">
            <div className="mb-4 text-6xl">😔</div>
            <h1 className="mb-4 text-2xl font-bold text-gray-800">
              {error || "Restaurant not found"}
            </h1>
            <p className="text-gray-600 mb-6">
              We couldn&#39;t find the restaurant you&#39;re looking for.
            </p>
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
    </>
  );
}