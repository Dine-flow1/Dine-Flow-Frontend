
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MenuItemCard from "@/components/ui/MenuItemCard";
import { MenuItem } from "../../../types/restaurant";
import apiService from "../../../lib/apiService";

interface RestaurantData {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  cuisine?: string | string[];
  location?: string;
  image?: string;
  menu?: MenuItem[];
}

export default function RestaurantDetail() {
  const params = useParams();
  const id = params?.id as string;

  const [restaurant, setRestaurant] = useState<RestaurantData | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (!id) {
        setError("Restaurant ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch restaurant details
        const restaurantData = await apiService.getRestaurant(id);

        if (!restaurantData) {
          setError("Restaurant not found");
          setLoading(false);
          return;
        }

        setRestaurant(restaurantData);

        // Fetch menu items
        try {
          const items = await apiService.getMenuItems(id);
          setMenuItems(Array.isArray(items) ? items : []);
        } catch (menuError) {
          console.warn("Failed to load menu items:", menuError);
          setMenuItems([]);
        }
      } catch (err) {
        console.error("Error fetching restaurant:", err);
        setError("Failed to load restaurant details");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading restaurant...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600">{error || "Restaurant not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 bg-yellow-50">
      <div className="max-w-6xl px-6 mx-auto">
        {/* Restaurant Header */}
        <div className="flex flex-col items-center mb-10 overflow-hidden bg-white shadow-md md:flex-row rounded-2xl">
          <img
            src={restaurant.image || "/placeholder-restaurant.jpg"}
            alt={restaurant.name}
            className="object-cover w-full h-64 md:w-1/2"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder-restaurant.jpg";
            }}
          />
          <div className="p-6 md:w-1/2">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              {restaurant.name}
            </h2>
            <p className="mb-3 text-gray-500">
              {restaurant.description || "No description available"}
            </p>
            <div className="space-y-2">
              {restaurant.cuisine && (
                <p className="text-sm text-gray-600">
                  <strong>Cuisine:</strong> {restaurant.cuisine}
                </p>
              )}
              {restaurant.location && (
                <p className="text-sm text-gray-600">
                  <strong>Location:</strong> {restaurant.location}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div>
          <h3 className="mb-4 text-xl font-semibold text-gray-800">Menu</h3>
          {menuItems && menuItems.length > 0 ? (
            menuItems.map((item) => (
              <MenuItemCard key={item._id || item.id} item={item} restaurantId={restaurant._id || restaurant.id || ""} restaurantName={restaurant.name || ""} />
            ))
          ) : (
            <div className="p-8 text-center bg-white rounded-lg shadow-md">
              <p className="text-gray-500">
                No menu items available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
