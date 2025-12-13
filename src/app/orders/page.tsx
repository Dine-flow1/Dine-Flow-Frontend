"use client";
import { useState } from 'react';
import OrderHistory from '../../components/order/OrderHistory';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';
import { Cart } from '../../components/ui/Cart';
import { CartProvider } from '../../Context/CartContext';
export default function OrdersPage() {
  const [showCart, setShowCart] = useState(false);
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-16 pb-20">
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-2">Track and manage all your food orders</p>
              
              {/* Cart Toggle Button */}
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => setShowCart(!showCart)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  {showCart ? 'Hide Cart' : 'Show Cart'}
                </button>
                <button
                  onClick={() => window.location.href = '/cart'}
                  className="border border-blue-500 text-blue-500 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Go to Cart Page
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Order History */}
              <div className={`${showCart ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                <OrderHistory 
                  userId="user123"
                  showStats={true}
                  compact={showCart}
                />
              </div>

              {/* Cart Sidebar */}
              {showCart && (
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Shopping Cart Preview</h2>
                    <div className="space-y-4">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl text-blue-600">🛒</span>
                        </div>
                        <p className="text-gray-600 mb-4">Your cart items will appear here</p>
                        <p className="text-sm text-gray-500 mb-6">
                          Use the cart icon in the bottom right to manage your cart
                        </p>
                      </div>
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
                      <div className="space-y-2">
                        <button
                          onClick={() => window.location.href = '/checkout'}
                          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                        >
                          Proceed to Checkout
                        </button>
                        <button
                          onClick={() => window.location.href = '/menu'}
                          className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
                        >
                          Browse Menu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Global Cart Component */}
      <CartProvider>
      <Cart />
      </CartProvider>
      <Footer />
    </>
  );
}