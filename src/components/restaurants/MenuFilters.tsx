'use client';

import { useState, useEffect } from 'react';
import { Filter, Search, X, ChevronDown, Sparkles, Flame, Leaf, Zap } from 'lucide-react';
import { gsap } from 'gsap';

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface MenuFiltersProps {
  categories?: string[];
  onFilterChange?: (filters: {
    category: string | null;
    dietary: string[];
    priceRange: [number, number] | null;
    sortBy: string;
  }) => void;
}

export default function MenuFilters({ categories = [], onFilterChange }: MenuFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>('all');
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number] | null>(null);
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const dietaryOptions: FilterOption[] = [
    { id: 'vegetarian', label: 'Vegetarian', icon: <Leaf className="h-4 w-4" />, count: 12 },
    { id: 'vegan', label: 'Vegan', icon: <Leaf className="h-4 w-4" />, count: 8 },
    { id: 'spicy', label: 'Spicy', icon: <Flame className="h-4 w-4" />, count: 15 },
    { id: 'gluten-free', label: 'Gluten Free', icon: <Zap className="h-4 w-4" />, count: 6 },
  ];

  const sortOptions = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest Items' },
  ];

  const priceRanges = [
    { id: 'budget', label: 'Budget ($)', min: 0, max: 10 },
    { id: 'moderate', label: 'Moderate ($$)', min: 10, max: 25 },
    { id: 'premium', label: 'Premium ($$$)', min: 25, max: 50 },
    { id: 'luxury', label: 'Luxury ($$$$)', min: 50, max: 100 },
  ];

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        category: activeCategory,
        dietary: dietaryFilters,
        priceRange,
        sortBy,
      });
    }
  }, [activeCategory, dietaryFilters, priceRange, sortBy, onFilterChange]);

  const handleDietaryToggle = (id: string) => {
    setDietaryFilters(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handlePriceRangeSelect = (range: typeof priceRanges[0]) => {
    setPriceRange(prev =>
      prev?.[0] === range.min && prev?.[1] === range.max
        ? null
        : [range.min, range.max]
    );
  };

  const clearAllFilters = () => {
    setActiveCategory('all');
    setDietaryFilters([]);
    setPriceRange(null);
    setSortBy('popular');
    setSearchQuery('');
  };

  // Animation for filter items
  useEffect(() => {
    gsap.from('.filter-item', {
      duration: 0.4,
      y: 20,
      opacity: 0,
      stagger: 0.05,
      ease: 'power2.out',
    });
  }, []);

  return (
    <>
      {/* Main Filters Bar */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-8 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
              <Filter className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Filter & Sort</h3>
              <p className="text-sm text-gray-500">
                {dietaryFilters.length > 0 || priceRange || activeCategory !== 'all'
                  ? `${dietaryFilters.length} dietary • ${priceRange ? 'Price filtered' : ''} • ${activeCategory !== 'all' ? 'Category filtered' : ''}`
                  : 'All filters are currently active'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="md:hidden px-4 py-2 bg-gray-100 rounded-xl flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>

            {(dietaryFilters.length > 0 || priceRange || activeCategory !== 'all') && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2 transition-colors"
              >
                <X className="h-4 w-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for dishes, ingredients, or categories..."
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            Categories
          </h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`filter-item px-4 py-2 rounded-xl transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Menu
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`filter-item px-4 py-2 rounded-xl transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dietary Preferences */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Dietary Preferences</h4>
            <div className="space-y-2">
              {dietaryOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleDietaryToggle(option.id)}
                  className={`filter-item w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                    dietaryFilters.includes(option.id)
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      dietaryFilters.includes(option.id)
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {option.icon}
                    </div>
                    <span className="font-medium">{option.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{option.count}</span>
                    <div className={`h-4 w-4 rounded border ${
                      dietaryFilters.includes(option.id)
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300'
                    }`}>
                      {dietaryFilters.includes(option.id) && (
                        <div className="h-2 w-2 bg-white rounded m-auto" />
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
            <div className="space-y-2">
              {priceRanges.map((range) => {
                const isActive = priceRange?.[0] === range.min && priceRange?.[1] === range.max;
                return (
                  <button
                    key={range.id}
                    onClick={() => handlePriceRangeSelect(range)}
                    className={`filter-item w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-50 border border-blue-200'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                        isActive
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {range.label.charAt(0)}
                      </div>
                      <div>
                        <span className="font-medium">{range.label}</span>
                        <p className="text-sm text-gray-500">
                          ${range.min} - ${range.max}
                        </p>
                      </div>
                    </div>
                    {isActive && (
                      <div className="h-2 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Sort By</h4>
            <div className="space-y-2">
              {sortOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={`filter-item w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                    sortBy === option.id
                      ? 'bg-purple-50 border border-purple-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  <div className={`h-4 w-4 rounded-full ${
                    sortBy === option.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                      : 'border-2 border-gray-300'
                  }`}>
                    {sortBy === option.id && (
                      <div className="h-2 w-2 bg-white rounded-full m-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(dietaryFilters.length > 0 || priceRange || activeCategory !== 'all') && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Active Filters</h4>
            <div className="flex flex-wrap gap-2">
              {activeCategory !== 'all' && (
                <div className="px-3 py-2 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2">
                  Category: {activeCategory}
                  <button onClick={() => setActiveCategory('all')}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              {dietaryFilters.map(filter => {
                const option = dietaryOptions.find(o => o.id === filter);
                return (
                  <div key={filter} className="px-3 py-2 bg-green-100 text-green-800 rounded-full text-sm flex items-center gap-2">
                    {option?.label}
                    <button onClick={() => handleDietaryToggle(filter)}>
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
              {priceRange && (
                <div className="px-3 py-2 bg-orange-100 text-orange-800 rounded-full text-sm flex items-center gap-2">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <button onClick={() => setPriceRange(null)}>
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Filters Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Mobile filter content - reuse the same filter sections */}
            <div className="space-y-6">
              {/* Categories for mobile */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-3 py-2 rounded-lg text-sm ${
                      activeCategory === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        activeCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Apply Button for Mobile */}
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold text-lg"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}