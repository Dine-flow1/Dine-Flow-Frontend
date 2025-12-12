'use client';

import React, { useState } from 'react';
import { Star, Heart, Plus, Minus, ShoppingBag } from 'lucide-react';
import { MenuItem } from '@/types/restaurant';
import { gsap } from 'gsap';

interface MenuItemCardProps {
  item: MenuItem;
  restaurantId: string;
  restaurantName?: string;
  variant?: 'default' | 'popular' | 'featured';
}

export default function MenuItemCard({
  item,
  restaurantId,
  restaurantName,
  variant = 'default',
}: MenuItemCardProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const addToCart = () => {
    if (quantity === 0) setQuantity(1);

    setIsAnimating(true);
    // small GSAP scale/press effect on the add button
    setTimeout(() => setIsAnimating(false), 600);

    // TODO: Add to cart logic via apiService / context
    console.log('Added to cart:', item);
  };

  const formatCurrency = (value?: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value ?? 0;
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
      }).format(num as number);
    } catch {
      return `$${num}`;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'popular':
        return 'border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50';
      case 'featured':
        return 'border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50';
      default:
        return 'bg-white border border-gray-200 hover:border-blue-200';
    }
  };

  const getBadge = () => {
    if (variant === 'popular') {
      return (
        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full z-10">
          🔥 Popular
        </div>
      );
    }
    if (variant === 'featured') {
      return (
        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-full z-10">
          ⭐ Featured
        </div>
      );
    }
    if (item.isVegetarian) {
      return (
        <div className="absolute top-4 left-4 px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full z-10">
          🌱 Veg
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`group relative rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden ${getVariantClasses()} hover:scale-[1.02]`}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
          y: -6,
          duration: 0.28,
          ease: 'power2.out',
        });
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        gsap.to(e.currentTarget, {
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }}
    >
      {getBadge()}

      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-50">
        {/* Background / gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-110 transition-transform duration-700"></div>

        {/* Image */}
        <img
          src={item.image || '/placeholder-restaurant.jpg'}
          alt={item.name || 'Menu item'}
          className="object-cover w-full h-full"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/placeholder-restaurant.jpg';
          }}
        />

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite((prev) => !prev)}
          aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
          className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>

        {/* Item Tags */}
        <div className="absolute bottom-4 left-4 flex gap-2 z-10">
          {item.isSpicy && (
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              🌶️ Spicy
            </span>
          )}
          {item.isVegan && (
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
              🌿 Vegan
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="pr-4">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{item.category}</p>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="flex items-center justify-end gap-2">
              <span className="text-3xl font-bold text-gray-900">{formatCurrency(item.price)}</span>
              {item.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatCurrency(item.originalPrice)}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-2 justify-end">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{item.rating ?? 4.5}</span>
              <span className="text-sm text-gray-400">({item.reviewCount ?? 100})</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6 line-clamp-2">
          {item.description ?? 'Delicious dish prepared with fresh ingredients and authentic flavors.'}
        </p>

        {/* Calories and Prep Time */}
        <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
          {item.calories && <span>🔥 {item.calories} cal</span>}
          {item.prepTime && <span>⏱️ {item.prepTime} min</span>}
          <span className="ml-auto">
            {item.availability ?? true ? '✅ Available' : '❌ Sold Out'}
          </span>
        </div>

        {/* Add to Cart Section */}
        <div className="flex items-center justify-between">
          {quantity > 0 ? (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                aria-label="Decrease quantity"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Minus className="h-4 w-4 text-gray-700" />
              </button>
              <span className="text-lg font-bold text-gray-900 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Plus className="h-4 w-4 text-gray-700" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-gray-600">
              <ShoppingBag className="h-4 w-4" />
              <span className="text-sm">Add to start ordering</span>
            </div>
          )}

          <button
            onClick={addToCart}
            disabled={!item.availability}
            aria-label="Add to cart"
            className={`relative px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              quantity > 0
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            } ${item.availability ? '' : 'opacity-50 cursor-not-allowed'}`}
          >
            {quantity > 0 ? 'Update Cart' : 'Add to Cart'}

            {/* Animation circle */}
            {isAnimating && (
              <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
            )}
          </button>
        </div>
      </div>

      {/* Floating price tag effect */}
      <div className="absolute -top-3 -right-3 h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform rotate-12 opacity-90 group-hover:rotate-0 transition-transform duration-500 z-10">
        <span className="text-white text-sm font-bold">{formatCurrency(item.price)}</span>
      </div>
    </div>
  );
}