'use client';

import { useState, useEffect } from 'react';
import { 
  Star, 
  Clock, 
  MapPin, 
  Phone, 
  Globe, 
  Heart, 
  Share2, 
  ChevronRight, 
  CheckCircle,
  Utensils,
  Users,
  Award,
  Shield
} from 'lucide-react';
import { gsap } from 'gsap';

interface RestaurantHeaderProps {
  restaurant: {
    name: string;
    description?: string;
    rating: number;
    reviewCount?: number;
    deliveryTime?: string;
    cuisine?: string;
    priceRange?: string;
    address?: string;
    phone?: string;
    website?: string;
    openingHours?: string;
    features?: string[];
  };
}

export default function RestaurantHeader({ restaurant }: RestaurantHeaderProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const features = restaurant.features || [
    'Free Delivery',
    'Takeaway Available',
    'Dine-in',
    'Outdoor Seating',
    'Family Friendly',
    'Vegetarian Options'
  ];

  // Parallax effect and scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial animations
    gsap.from('.hero-title', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
    });

    gsap.from('.hero-content', {
      duration: 0.8,
      y: 30,
      opacity: 0,
      delay: 0.3,
      stagger: 0.1,
      ease: 'power3.out',
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Hero Section */}
      <div className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"
            style={{
              backgroundImage: 'url("/api/placeholder/1920/800")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* Animated floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${3 + Math.random() * 4}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute top-8 right-8 z-20">
          <div className="flex gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-3 bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
            >
              <Heart 
                className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
              />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
              </div>
            </button>
            <button className="p-3 bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 transition-all duration-300 hover:scale-110 group">
              <Share2 className="h-6 w-6 text-white" />
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Share
              </div>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 h-full flex items-end pb-20 md:pb-32">
          <div className="max-w-7xl mx-auto w-full px-4">
            <div className="max-w-3xl">
              {/* Cuisine Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-white/20 backdrop-blur-lg text-white rounded-full text-sm font-medium flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  {restaurant.cuisine || 'Fine Dining'}
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-orange-500/30 to-red-500/30 backdrop-blur-lg text-white rounded-full text-sm font-medium">
                  🏆 Top Rated
                </span>
                <span className="px-4 py-2 bg-green-500/30 backdrop-blur-lg text-white rounded-full text-sm font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Safety Certified
                </span>
              </div>

              {/* Restaurant Name */}
              <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {restaurant.name}
              </h1>

              {/* Description */}
              <p className="hero-content text-xl text-white/90 mb-8 max-w-2xl">
                {restaurant.description || 'Experience exquisite dining with our carefully curated menu and exceptional service.'}
              </p>

              {/* Stats Bar */}
              <div className="hero-content flex flex-wrap items-center gap-6 mb-8">
                {/* Rating */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg p-3 rounded-2xl">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(restaurant.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/30'}`}
                      />
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-white">{restaurant.rating}</div>
                    <div className="text-sm text-white/70">
                      ({restaurant.reviewCount || '100+'} reviews)
                    </div>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg p-3 rounded-2xl">
                  <Clock className="h-5 w-5 text-white/80" />
                  <div>
                    <div className="font-bold text-white">{restaurant.deliveryTime || '30-45'} mins</div>
                    <div className="text-sm text-white/70">Delivery</div>
                  </div>
                </div>

                {/* Price Range */}
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-lg p-3 rounded-2xl">
                  <div className="text-2xl text-white">
                    {restaurant.priceRange === 'budget' ? '$' : 
                     restaurant.priceRange === 'moderate' ? '$$' : 
                     restaurant.priceRange === 'expensive' ? '$$$' : '$$$$'}
                  </div>
                  <div className="text-sm text-white/70">Price Range</div>
                </div>

                {/* Open Status */}
                <div className="flex items-center gap-2 bg-green-500/30 backdrop-blur-lg p-3 rounded-2xl">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <div className="text-white font-medium">Open Now</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="hero-content flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-3 group">
                  <span>Order Now</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 border border-white/20">
                  View Menu
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Info Cards */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-full max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Location</h4>
                  <p className="text-sm text-gray-600">{restaurant.address || '123 Main Street'}</p>
                </div>
              </div>
              <button className="w-full py-3 bg-blue-50 text-blue-700 rounded-xl hover:bg-blue-100 transition-colors">
                Get Directions
              </button>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Contact</h4>
                  <p className="text-sm text-gray-600">{restaurant.phone || '(123) 456-7890'}</p>
                </div>
              </div>
              <button className="w-full py-3 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
                Call Now
              </button>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Hours</h4>
                  <p className="text-sm text-gray-600">{restaurant.openingHours || '9 AM - 11 PM Daily'}</p>
                </div>
              </div>
              <button className="w-full py-3 bg-purple-50 text-purple-700 rounded-xl hover:bg-purple-100 transition-colors">
                Reserve Table
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar (appears on scroll) */}
      <div className={`sticky top-0 z-40 bg-white shadow-xl transition-all duration-300 ${
        scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">{restaurant.name.charAt(0)}</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    {restaurant.rating}
                  </span>
                  <span>•</span>
                  <span>{restaurant.cuisine}</span>
                  <span>•</span>
                  <span>{restaurant.deliveryTime || '30-45'} mins</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
          <p className="text-gray-600">Experience exceptional dining with these exclusive features</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.slice(0, 6).map((feature, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-50 to-white p-4 rounded-2xl border border-gray-200 hover:border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="h-12 w-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                {index % 6 === 0 && <Users className="h-6 w-6 text-blue-600" />}
                {index % 6 === 1 && <Award className="h-6 w-6 text-green-600" />}
                {index % 6 === 2 && <Shield className="h-6 w-6 text-purple-600" />}
                {index % 6 === 3 && <Clock className="h-6 w-6 text-orange-600" />}
                {index % 6 === 4 && <CheckCircle className="h-6 w-6 text-red-600" />}
                {index % 6 === 5 && <Utensils className="h-6 w-6 text-indigo-600" />}
              </div>
              <p className="font-medium text-gray-900 text-center">{feature}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </>
  );
}