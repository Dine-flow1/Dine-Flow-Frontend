'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { MapPin, Phone, Globe, Clock, Star, Menu } from 'lucide-react';
import ApiService from '@/lib/apiService';
import { handleAuthError, shouldRedirectToLogin } from '@/lib/errors/errorHandler';

export default function RestaurantDetail() {
  const params = useParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check authentication first
        if (!ApiService.isAuthenticated()) {
          setError('Please login to view restaurant details');
          setTimeout(() => {
            const userRole = localStorage.getItem('userRole');
            if (userRole === 'manager') {
              router.push('/managers/login');
            } else {
              router.push('/login');
            }
          }, 1500);
          return;
        }

        const data = await ApiService.getRestaurant(params.id as string);
        setRestaurant(data);
        
        // Animate content
        gsap.from('.restaurant-content', {
          duration: 0.6,
          y: 30,
          opacity: 0,
          ease: 'power3.out'
        });
      } catch (err: any) {
        console.error('Error fetching restaurant:', err);
        
        // Handle authentication errors
        if (shouldRedirectToLogin(err)) {
          handleAuthError(err);
          setError('Your session has expired. Redirecting to login...');
          return;
        }

        // Handle other errors
        if (err.statusCode === 404) {
          setError('Restaurant not found');
        } else if (err.statusCode >= 500) {
          setError('Server error. Please try again later.');
        } else {
          setError(err.message || 'Failed to load restaurant details');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [params.id, router]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push('/restaurants')}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Browse Restaurants
            </button>
            <button
              onClick={() => {
                const userRole = localStorage.getItem('userRole');
                if (userRole === 'manager') {
                  router.push('/managers/dashboard');
                } else {
                  router.push('/restaurant-owners/dashboard');
                }
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render restaurant details (same as before)
  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏪</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Restaurant Not Found</h2>
          <p className="text-gray-600 mb-6">The restaurant you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/restaurants')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="restaurant-content">
        {/* Restaurant header with image */}
        <div className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative h-full flex items-center justify-center text-white">
            <div className="text-center max-w-4xl px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{restaurant.name}</h1>
              <p className="text-xl mb-6">{restaurant.description}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
                  {restaurant.cuisineType}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full flex items-center">
                  <Star className="h-4 w-4 mr-1 fill-white" />
                  {restaurant.rating} ({restaurant.totalReviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant details - Same as before */}
        {/* ... rest of the component remains the same ... */}
      </div>
    </div>
  );
}