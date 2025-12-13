'use client';
import { useCart } from '../../Context/CartContext';
import CartItemList from '../../components/cart/CartItemList';
import Navbar from '../../components/ui/Navbar';
import Footer from '../../components/ui/Footer';

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeItem,
    updateSpecialInstructions,
    updateAddons,
    restaurantName,
    getCartSubtotal,
    getCartTotal,
  } = useCart();

  const deliveryFee = 5.99;
  const tax = getCartSubtotal() * 0.1;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🛒</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add items from the menu to get started</p>
              <button 
                onClick={() => window.location.href = '/menu'}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CartItemList
                  items={items}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onUpdateInstructions={updateSpecialInstructions}
                  onUpdateAddons={updateAddons}
                  restaurantName={restaurantName ?? undefined}
                />
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${getCartSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => window.location.href = '/checkout'}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold mt-6 transition-colors duration-200"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By placing your order, you agree to our Terms of Service
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}