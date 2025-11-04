
"use client";

import { useState, useMemo, use } from "react";
import { restaurants } from "@/src/data/restaurants";
import { RestaurantData } from "@/src/types/restruant";
import MenuItemCard from "@/src/components/MenuItemCard";
import TableBookingForm from "../../../components/TableBookingForm";
import Navbar from "@/src/components/Navbar";

export default function RestaurantDetail({ params }: { params: Promise<{ id: string }> }) {
  
  const resolvedParams = use(params);
  const restaurant = restaurants.find((r) => r.id === Number(resolvedParams.id));
  const [activeTab, setActiveTab] = useState<"order" | "book">("order");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [searchTerm, setSearchTerm] = useState("");

  if (!restaurant) {
    return (
      <div className="min-h-screen py-10 bg-yellow-50">
        <div className="max-w-6xl px-6 mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800">Restaurant not found</h1>
        </div>
      </div>
    );
  }

  // Get unique categories from menu items with safe access
  const categories = useMemo(() => {
    const allCategories = restaurant.menu.map(item => 
      (item as any).category || "Main Course"
    );
    return ["All", ...Array.from(new Set(allCategories))];
  }, [restaurant.menu]);

  // Filter and sort menu items with safe category access
  const filteredMenu = useMemo(() => {
    let filtered = restaurant.menu.filter(item => {
      const itemCategory = (item as any).category || "Main Course";
      
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All" || 
        itemCategory === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort menu items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return filtered;
  }, [restaurant.menu, searchTerm, selectedCategory, sortBy]);

  return (
    <>
    <Navbar/>
    <div className="min-h-screen py-7 bg-linear-to-br from-yellow-50 to-amber">
      {/* Restaurant Header */}
      <div className="shadow-lg bg-linear-to-br from-yellow-50 to-amber-50 rounded-b-3xl">
        <div className="max-w-6xl px-6 py-8 mx-auto">
          <div className="flex flex-col items-center gap-6 md:flex-row">
            <img
              src={restaurant.image as string}
              alt={restaurant.restaurantName}
              className="object-cover w-full h-64 rounded-2xl md:w-1/3"
              />
            <div className="flex-1">
              <h1 className="mb-4 text-4xl font-bold text-gray-800">
                {restaurant.restaurantName}
              </h1>
              <p className="mb-4 text-lg text-gray-600">{restaurant.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-semibold">4.2</span>
                  <span className="text-gray-500">(1.2k reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">📍</span>
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">🛵</span>
                  <span>25-35 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="max-w-6xl px-6 mx-auto">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("order")}
            className={`flex-1 py-4 px-6 text-lg font-semibold text-center transition-colors ${
              activeTab === "order"
                ? "text-yellow-600 border-b-2 border-yellow-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            🍽️ Order Food
          </button>
          <button
            onClick={() => setActiveTab("book")}
            className={`flex-1 py-4 px-6 text-lg font-semibold text-center transition-colors ${
              activeTab === "book"
                ? "text-yellow-600 border-b-2 border-yellow-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            🪑 Book Table
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "order" ? (
          <div className="py-8">
            {/* Filters Section */}
            <div className="p-6 mb-8 bg-white shadow-lg rounded-2xl">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                {/* Search Input */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="🔍 Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border-2 border-yellow-200 outline-none rounded-xl focus:border-yellow-400"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>

              {/* Results Count */}
              <div className="mt-4 text-sm text-gray-600">
                Showing {filteredMenu.length} menu items
                {searchTerm && (
                  <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
                )}
                {selectedCategory !== "All" && (
                  <span> in <span className="font-semibold">{selectedCategory}</span></span>
                )}
              </div>
            </div>

            {/* Menu Items Grid */}
            {filteredMenu.length === 0 ? (
              <div className="py-16 text-center bg-white shadow-lg rounded-2xl">
                <div className="mb-4 text-6xl">🍽️</div>
                <h3 className="mb-2 text-2xl font-semibold text-gray-700">No menu items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredMenu.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="py-8">
            <TableBookingForm restaurant={restaurant} />
          </div>
        )}
      </div>
    </div>
    </>
  );
}