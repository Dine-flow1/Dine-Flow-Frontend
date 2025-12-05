import React, { useState, useMemo } from "react";
import MenuItemCard from "../../components/ui/MenuItemCard";
import TableBookingForm from "../../components/ui/TableBookingForm";
import RestaurantHeaderSection from "../../components/ui/RestaurantHeaderSection";
import { RestaurantData, MenuItem } from "../../../src/types/restaurant";

interface OrderAndBookingSectionProps {
  restaurant: RestaurantData;
  menuItems: MenuItem[];
}

const OrderAndBookingSection: React.FC<OrderAndBookingSectionProps> = ({
  restaurant,
  menuItems
}) => {

  const [viewMode, setViewMode] = useState<"menu" | "booking">("menu");

  const categories = useMemo(() => {
    const all = menuItems.map(item => item.category || "Main Courses");
    return ["All", ...Array.from(new Set(all))];
  }, [menuItems]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMenu = useMemo(() => {
    if (selectedCategory === "All") return menuItems;
    return menuItems.filter(
      item => (item.category || "Main Courses") === selectedCategory
    );
  }, [menuItems, selectedCategory]);

  return (
    <>
      <RestaurantHeaderSection
        restaurant={restaurant}
        onMenuClick={() => setViewMode("menu")}
        onBookClick={() => setViewMode("booking")}
      />

      {/* MENU VIEW */}
      {viewMode === "menu" && (
        <div className="w-full">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Menu</h2>

          {/* Category Buttons */}
          <div className="flex gap-4 mb-8 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-lg font-semibold rounded-full border-2 transition-colors ${
                  selectedCategory === category
                    ? "bg-yellow-700 text-white shadow"
                    : "bg-white text-gray-900 border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu Items Full Width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenu.length === 0 ? (
              <div className="py-16 text-center bg-white shadow-lg rounded-2xl">
                <div className="mb-4 text-6xl">🍽️</div>
                <h3 className="mb-2 text-2xl font-semibold text-gray-700">No menu items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredMenu.map(item => <MenuItemCard key={item._id} item={item} />)
            )}
          </div>
        </div>
      )}

      {/* BOOKING VIEW */}
      {viewMode === "booking" && (
        <div className="w-full">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Book a Table</h2>

          <div className="w-full bg-white p-6 rounded-2xl shadow">
            <TableBookingForm restaurant={restaurant} />
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAndBookingSection;
