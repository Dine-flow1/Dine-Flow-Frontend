import React, { useState, useMemo } from "react";
import MenuItemCard from "@/src/components/ui/MenuItemCard";
import TableBookingForm from "@/src/components/ui/TableBookingForm";
import RestaurantHeaderSection from "@/src/components/ui/RestaurantHeaderSection";
import { RestaurantData, MenuItem } from "@/src/types/restaurant";

interface OrderAndBookingSectionProps {
  restaurant: RestaurantData;
  menuItems: MenuItem[];
}

const OrderAndBookingSection: React.FC<OrderAndBookingSectionProps> = ({ restaurant, menuItems }) => {
  const categories = useMemo(() => {
    const all = menuItems.map(item => item.category || "Main Courses");
    return ["All", ...Array.from(new Set(all))];
  }, [menuItems]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Refs for scrolling
  const menuRef = React.useRef<HTMLDivElement>(null);
  const bookingRef = React.useRef<HTMLDivElement>(null);

  // Filter menu items by selected category
  const filteredMenu = useMemo(() => {
    if (selectedCategory === "All") return menuItems;
    return menuItems.filter(item => (item.category || "Main Courses") === selectedCategory);
  }, [menuItems, selectedCategory]);

  // Scroll handlers
  const handleMenuClick = () => {
    menuRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleBookClick = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <RestaurantHeaderSection restaurant={restaurant} onMenuClick={handleMenuClick} onBookClick={handleBookClick} />
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Menu Section */}
        <div className="flex-1" ref={menuRef}>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Menu</h2>
          {/* Category Filter Buttons */}
          <div className="flex gap-4 mb-8">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 text-lg font-semibold rounded-full border-2 transition-colors duration-200 ${
                  selectedCategory === category
                    ? "bg-yellow-700 text-white shadow"
                    : "bg-white text-gray-900 border-yellow-200 hover:bg-yellow-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {filteredMenu.length === 0 ? (
              <div className="py-16 text-center bg-white shadow-lg rounded-2xl">
                <div className="mb-4 text-6xl">🍽️</div>
                <h3 className="mb-2 text-2xl font-semibold text-gray-700">No menu items found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              filteredMenu.map((item) => (
                <MenuItemCard key={item._id} item={item} />
              ))}
          </div>
        </div>
        {/* Table Booking Section */}
        <div className="w-full md:w-1/3" ref={bookingRef}>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Book a Table</h2>
          <TableBookingForm restaurant={restaurant} />
        </div>
      </div>
    </>
  );
};

export default OrderAndBookingSection;
