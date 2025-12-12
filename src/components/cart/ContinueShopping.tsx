'use client';

import { useRouter } from 'next/navigation';
import { useCart } from '../../Context/CartContext';
import Link from 'next/link';
import {
  ArrowLeft,
  Store,
  Home,
  Search,
  Clock,
  Star,
  ChefHat,
  Pizza,
  Coffee,
  UtensilsCrossed,
  ShoppingBag
} from 'lucide-react';

interface ContinueShoppingProps {
  variant?: 'default' | 'compact' | 'full';
  title?: string;
  description?: string;
  showRestaurants?: boolean;
  showCategories?: boolean;
}

export default function ContinueShopping({
  variant = 'default',
  title,
  description,
  showRestaurants = true,
  showCategories = true
}: ContinueShoppingProps) {
  const router = useRouter();
  const { restaurantId, restaurantName } = useCart();

  const popularRestaurants = [
    { id: '1', name: 'Italian Bistro', rating: 4.5, cuisine: 'Italian', deliveryTime: '25-30 min', icon: <Pizza className="text-orange-600" /> },
    { id: '2', name: 'Burger Palace', rating: 4.3, cuisine: 'American', deliveryTime: '20-25 min', icon: <ChefHat className="text-red-600" /> },
    { id: '3', name: 'Asian Wok', rating: 4.7, cuisine: 'Chinese', deliveryTime: '30-35 min', icon: <UtensilsCrossed className="text-blue-600" /> },
    { id: '4', name: 'Cafe Mocha', rating: 4.4, cuisine: 'Cafe', deliveryTime: '15-20 min', icon: <Coffee className="text-yellow-600" /> },
  ];

  const foodCategories = [
    { name: 'Pizza', icon: '🍕', count: 45 },
    { name: 'Burgers', icon: '🍔', count: 32 },
    { name: 'Sushi', icon: '🍣', count: 28 },
    { name: 'Salads', icon: '🥗', count: 24 },
    { name: 'Indian', icon: '🍛', count: 52 },
    { name: 'Chinese', icon: '🥢', count: 41 },
    { name: 'Desserts', icon: '🍰', count: 36 },
    { name: 'Beverages', icon: '🥤', count: 29 },
  ];

  const handleContinueToRestaurant = () => {
    if (restaurantId) {
      router.push(`/restaurant/${restaurantId}`);
    } else {
      router.push('/restaurants');
    }
  };

  const handleBrowseAll = () => {
    router.push('/restaurants');
  };

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Continue Shopping</h3>
            <p className="text-sm text-gray-600">
              {restaurantName ? `Continue with ${restaurantName}` : 'Browse more restaurants'}
            </p>
          </div>
          <button
            onClick={handleContinueToRestaurant}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Store size={18} />
            Continue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-8 text-center bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full animate-pulse"></div>
          <ShoppingBag className="absolute inset-0 m-auto text-blue-600" size={48} />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          {title || 'Hungry for more?'}
        </h2>
        
        <p className="text-gray-600 max-w-lg mx-auto text-lg mb-8">
          {description || 'Discover delicious dishes from our top-rated restaurants. Your next favorite meal is just a click away!'}
        </p>
      </div>

      {/* Main Content */}
      <div className="p-8">
        {/* Primary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {restaurantId && (
            <button
              onClick={handleContinueToRestaurant}
              className="group p-6 bg-gradient-to-r from-blue-50 to-white border-2 border-blue-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform">
                  <Store className="text-blue-600" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Continue with {restaurantName}</h3>
                  <p className="text-gray-600">Go back to the restaurant menu</p>
                </div>
              </div>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Resume Order</span>
                <ArrowLeft className="ml-2 rotate-180" size={20} />
              </div>
            </button>
          )}

          <button
            onClick={handleBrowseAll}
            className="group p-6 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-2xl hover:border-green-400 hover:shadow-lg transition-all text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-green-100 rounded-xl group-hover:scale-110 transition-transform">
                <Search className="text-green-600" size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Explore All Restaurants</h3>
                <p className="text-gray-600">Browse 100+ restaurants nearby</p>
              </div>
            </div>
            <div className="flex items-center text-green-600 font-medium">
              <span>Discover New Places</span>
              <ArrowLeft className="ml-2 rotate-180" size={20} />
            </div>
          </button>
        </div>

        {/* Quick Actions */}
        <div className="mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Actions</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/restaurants?sort=rating"
              className="p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="text-yellow-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Top Rated</h4>
              <p className="text-sm text-gray-600">4.5+ stars</p>
            </Link>

            <Link
              href="/restaurants?sort=delivery_time"
              className="p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="text-green-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Fast Delivery</h4>
              <p className="text-sm text-gray-600">Under 30 mins</p>
            </Link>

            <Link
              href="/categories"
              className="p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-purple-100 rounded-full flex items-center justify-center">
                <UtensilsCrossed className="text-purple-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Categories</h4>
              <p className="text-sm text-gray-600">Browse by type</p>
            </Link>

            <Link
              href="/"
              className="p-5 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-center"
            >
              <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-full flex items-center justify-center">
                <Home className="text-blue-600" size={24} />
              </div>
              <h4 className="font-semibold text-gray-800 mb-1">Go Home</h4>
              <p className="text-sm text-gray-600">Back to homepage</p>
            </Link>
          </div>
        </div>

        {/* Popular Restaurants */}
        {showRestaurants && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Popular Restaurants</h3>
              <Link
                href="/restaurants"
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                View All
                <ArrowLeft className="rotate-180" size={16} />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularRestaurants.map((restaurant) => (
                <Link
                  key={restaurant.id}
                  href={`/restaurant/${restaurant.id}`}
                  className="group bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gray-100 rounded-lg group-hover:scale-110 transition-transform">
                        {restaurant.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{restaurant.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Star className="text-yellow-500" size={14} />
                          <span className="text-sm text-gray-600">{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Cuisine:</span>
                        <span className="font-medium">{restaurant.cuisine}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Delivery:</span>
                        <span className="font-medium text-green-600">{restaurant.deliveryTime}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="w-full py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                        View Menu
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Food Categories */}
        {showCategories && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Browse Categories</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
              {foodCategories.map((category) => (
                <Link
                  key={category.name}
                  href={`/categories/${category.name.toLowerCase()}`}
                  className="group p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all text-center"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-1">{category.name}</h4>
                  <p className="text-xs text-gray-500">{category.count} items</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-t">
        <div className="max-w-2xl mx-auto text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Need help deciding?
          </h4>
          <p className="text-gray-600 mb-6">
            Our recommendation engine can suggest dishes based on your preferences and order history.
          </p>
          <Link
            href="/recommendations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            <ChefHat size={20} />
            Get Personalized Recommendations
          </Link>
        </div>
      </div>
    </div>
  );
}