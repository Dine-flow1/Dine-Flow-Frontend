import Link from 'next/link';
import { ShoppingCart, Home, UtensilsCrossed, Search } from 'lucide-react';

interface EmptyCartProps {
  restaurantId?: string;
  restaurantName?: string;
}

export default function EmptyCart({ restaurantId, restaurantName }: EmptyCartProps) {
  return (
    <div className="text-center py-12 px-4">
      <div className="relative w-48 h-48 mx-auto mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full animate-pulse"></div>
        <ShoppingCart className="absolute inset-0 m-auto text-gray-300" size={80} />
        <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <UtensilsCrossed className="text-gray-400" size={32} />
        </div>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
        Looks like you haven't added any delicious items yet. Let's explore some mouth-watering options!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <Link
          href="/restaurants"
          className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Home size={22} />
          Browse Restaurants
        </Link>
        
        {restaurantId && (
          <Link
            href={`/restaurant/${restaurantId}`}
            className="inline-flex items-center justify-center gap-3 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300"
          >
            <Search size={22} />
            Back to Menu
          </Link>
        )}
      </div>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">🍕</span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">Best Pizzas</h4>
          <p className="text-sm text-gray-600">Try our chef's special pizzas</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">🍔</span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">Burgers & Fries</h4>
          <p className="text-sm text-gray-600">Classic combos with a twist</p>
        </div>
        
        <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl border border-red-100">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
            <span className="text-2xl">🍛</span>
          </div>
          <h4 className="font-semibold text-gray-800 mb-2">Asian Specials</h4>
          <p className="text-sm text-gray-600">Authentic Asian cuisine</p>
        </div>
      </div>
    </div>
  );
}