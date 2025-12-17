<<<<<<< HEAD
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { RestaurantData, MenuItem } from "@/types/restaurant";
import Navbar from "@/components/ui/Navbar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import OrderAndBookingSection from "@/components/ui/OrderAndBookingSection";
import { apiService } from "@/lib/apiService";

export default function RestaurantDetail() {
  const params = useParams();
  const id = params?.id; // ✅ safe access to id
=======
import { Suspense } from 'react';
import Image from 'next/image';
import { Star, Clock, MapPin, Phone, Globe, ChevronRight, Filter, Search, Heart, Share2 } from 'lucide-react';
import MenuItemCard from "@/components/ui/MenuItemCard";
import { getRestaurants } from "@/app/services/restaurantService";
import { MenuItem } from "@/types/restaurant";
import MenuFilters from '@/components/restaurants/MenuFilters';
import RestaurantHeader from '@/components/restaurants/RestaurantHeader';
import TableBooking from '@/components/restaurants/TableBooking';

interface RestaurantPageProps {
  params: {
    id: string;
  };
}
>>>>>>> 32056b138a34dafa7f7d54f25c9b9f23ef6d7abb

// Loading component
function RestaurantLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Skeleton Header */}
      <div className="relative h-96 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Skeleton Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

<<<<<<< HEAD
  useEffect(() => {
    if (!id) return;

    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1️⃣ Fetch restaurant
        const restaurantData = await apiService.getRestaurant(id);
        if (!restaurantData) {
          setError("Restaurant not found");
          return;
        }
        setRestaurant(restaurantData);

        // 2️⃣ Fetch menu items
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
            <p className="mt-4 text-lg text-gray-600">
              Loading restaurant details...
            </p>
=======
          {/* Skeleton Menu */}
          <div className="lg:w-2/3">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
>>>>>>> 32056b138a34dafa7f7d54f25c9b9f23ef6d7abb
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  return (
    <Suspense fallback={<RestaurantLoading />}>
      <RestaurantContent params={params} />
    </Suspense>
  );
}

async function RestaurantContent({ params }: { params: { id: string } }) {
  // Fetch restaurant data
  const restaurants = await getRestaurants();
  const restaurant = restaurants.find((r) => r._id === params.id);
  
  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="h-24 w-24 bg-gradient-to-r from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🍽️</span>
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

<<<<<<< HEAD
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
              Unable to fetch restaurant details.
            </p>
=======
  // Group menu items by category
  const menuCategories = restaurant.menu?.reduce((acc: Record<string, MenuItem[]>, item: MenuItem) => {
    const category = item.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {}) || {};
>>>>>>> 32056b138a34dafa7f7d54f25c9b9f23ef6d7abb

  const categories = Object.keys(menuCategories);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"
            style={{
              backgroundImage: `url('/api/placeholder/1200/600')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-8 right-8">
          <div className="flex gap-3">
            <button className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Heart className="h-5 w-5 text-white" />
            </button>
            <button className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
              <Share2 className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

<<<<<<< HEAD
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-7 bg-linear-to-br from-yellow-50 to-amber-50">
        <div className="max-w-6xl px-6 mx-auto">
          <OrderAndBookingSection
            restaurant={restaurant}
            menuItems={menuItems}
          />
=======
        {/* Hero Content */}
        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto w-full px-4 pb-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                {categories.slice(0, 3).map(category => (
                  <span 
                    key={category} 
                    className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
                {categories.length > 3 && (
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                    +{categories.length - 3} more
                  </span>
                )}
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {restaurant.name}
              </h1>
              
              <p className="text-xl text-white/90 mb-6 max-w-2xl">
                {restaurant.description}
              </p>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(restaurant.rating || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`}
                      />
                    ))}
                  </div>
                  <span className="text-white font-semibold">{restaurant.rating}</span>
                  <span className="text-white/70">({restaurant.reviewCount || '100+'} reviews)</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-white/80" />
                  <span className="text-white font-medium">{restaurant.deliveryTime || '30-45'} mins</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    {restaurant.priceRange === 'budget' ? '$' : 
                     restaurant.priceRange === 'moderate' ? '$$' : 
                     restaurant.priceRange === 'expensive' ? '$$$' : '$$$$'}
                  </span>
                  <span className="text-white/70">• {restaurant.cuisine}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Order Button */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
            <span>Order Now</span>
            <ChevronRight className="h-5 w-5" />
          </button>
>>>>>>> 32056b138a34dafa7f7d54f25c9b9f23ef6d7abb
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Restaurant Info */}
          <div className="lg:w-1/3 space-y-8">
            {/* Info Card */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Location & Contact
              </h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="text-gray-900 font-medium">{restaurant.address || '123 Main Street, City'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone</p>
                  <p className="text-gray-900 font-medium flex items-center gap-2">
                    <Phone className="h-4 w-4 text-green-600" />
                    {restaurant.phone || '(123) 456-7890'}
                  </p>
                </div>
                
                {restaurant.website && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Website</p>
                    <a 
                      href={restaurant.website}
                      className="text-blue-600 font-medium flex items-center gap-2 hover:text-blue-700"
                    >
                      <Globe className="h-4 w-4" />
                      Visit Website
                    </a>
                  </div>
                )}
              </div>

              {/* Opening Hours */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-4">Opening Hours</h4>
                <div className="space-y-3">
                  {['Mon-Fri', 'Saturday', 'Sunday'].map(day => (
                    <div key={day} className="flex justify-between items-center">
                      <span className="text-gray-600">{day}</span>
                      <span className="font-medium text-gray-900">9:00 AM - 11:00 PM</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🚗</span>
                  </div>
                  <p className="font-medium text-gray-900">Free Delivery</p>
                </div>
                <div className="bg-white rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🥡</span>
                  </div>
                  <p className="font-medium text-gray-900">Takeaway</p>
                </div>
                <div className="bg-white rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🍽️</span>
                  </div>
                  <p className="font-medium text-gray-900">Dine-in</p>
                </div>
                <div className="bg-white rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
                  <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl">🌟</span>
                  </div>
                  <p className="font-medium text-gray-900">Top Rated</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Menu */}
          <div className="lg:w-2/3">
            {/* Menu Header */}
            <div className="mb-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Menu</h2>
                  <p className="text-gray-600">Discover our delicious selection of {restaurant.menu?.length || 0} items</p>
                </div>
                
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="search"
                      placeholder="Search menu..."
                      className="pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                    />
                  </div>
                  <button className="px-6 py-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Filter className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Filter</span>
                  </button>
                </div>
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium shadow-lg">
                  All Menu
                </button>
                {categories.map(category => (
                  <button 
                    key={category}
                    className="px-6 py-3 bg-white border border-gray-200 rounded-full font-medium hover:border-blue-500 hover:text-blue-600 transition-all"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Grid by Categories */}
            <div className="space-y-12">
              {categories.map(category => (
                <div key={category} className="scroll-mt-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="h-12 w-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{category}</h3>
                      <p className="text-gray-600">
                        {menuCategories[category].length} {menuCategories[category].length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {menuCategories[category].map((item: MenuItem) => (
                      <div 
                        key={item._id}
                        className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100"
                      >
                        {/* Image Container */}
                        <div className="relative h-48 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                          {/* Favorite Button */}
                          <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                            <Heart className="h-5 w-5 text-gray-600" />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900">${item.price}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm text-gray-600">{item.rating || 4.5}</span>
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-600 mb-6 line-clamp-2">
                            {item.description || 'Delicious dish prepared with fresh ingredients.'}
                          </p>

                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              {item.isVegetarian && (
                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                  🌱 Vegetarian
                                </span>
                              )}
                              {item.isSpicy && (
                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                                  🌶️ Spicy
                                </span>
                              )}
                            </div>
                            
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Popular Items Section */}
            {restaurant.menu && restaurant.menu.length > 6 && (
              <div className="mt-16">
                <div className="mb-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">🔥 Popular This Week</h3>
                      <p className="text-gray-600">Our customer favorites</p>
                    </div>
                    <button className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-2">
                      View all
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Popular Items Carousel */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {restaurant.menu.slice(0, 3).map((item: MenuItem) => (
                      <div 
                        key={item._id}
                        className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 border border-orange-100"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.category}</p>
                          </div>
                          <div className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium">
                            Popular
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-gray-900">${item.price}</span>
                          <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-sm font-medium hover:shadow-md">
                            Order Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Table Booking System */}
            <section className="my-16">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    🎭 Book Your Tables
                  </h2>
                  
                </div>

                <TableBooking restaurantId={restaurant._id} restaurantName={String(restaurant.name)} />

                {/* Booking Benefits */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                    <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">🎯</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Best Seat Selection</h4>
                    <p className="text-gray-600">See exactly where you'll be seated before booking</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-6 rounded-2xl">
                    <div className="h-12 w-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">⚡</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Instant Confirmation</h4>
                    <p className="text-gray-600">Get your table reserved instantly with real-time availability</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-2xl">
                    <div className="h-12 w-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                      <span className="text-2xl">🛡️</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">Flexible Cancellation</h4>
                    <p className="text-gray-600">Free cancellation up to 24 hours before your reservation</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-2xl lg:hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-900">{restaurant.name}</p>
            <p className="text-sm text-gray-600">{restaurant.deliveryTime || '30-45'} min • Free delivery</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold hover:shadow-lg">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}