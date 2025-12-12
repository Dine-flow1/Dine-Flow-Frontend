'use client';

import { useState, useRef, useEffect } from 'react';
import { useCart } from '@/app/Context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShoppingCart, 
  X, 
  ChevronRight, 
  Trash2, 
  ArrowLeft,
  Package,
  Clock,
  Shield,
  Home,
  Store,
  CreditCard,
  Tag,
  AlertCircle,
  CheckCircle,
  Plus,
  Minus
} from 'lucide-react';
import gsap from 'gsap';
import CartItem from './CartItem';
import { showConfirmAlert, showSuccessToast } from '@/utils/sweetAlert';

interface CartSectionProps {
  variant?: 'floating' | 'sidebar' | 'page';
  showAsPage?: boolean;
}

export default function CartSection({ variant = 'floating', showAsPage = false }: CartSectionProps) {
  const [isOpen, setIsOpen] = useState(showAsPage);
  const [isAnimating, setIsAnimating] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  
  const cartRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  
  const {
    items,
    totalQuantity,
    totalAmount,
    restaurantId,
    restaurantName,
    updateQuantity,
    removeItem,
    updateSpecialInstructions,
    updateAddons,
    getCartSubtotal,
    getCartTotal,
    clearCart,
  } = useCart();

  const deliveryFee = restaurantName ? 5.99 : 0;
  const tax = getCartSubtotal() * 0.1;
  const finalTotal = getCartTotal() - promoDiscount;
  
  const estimatedDeliveryTime = 30; // minutes

  // Promo codes database
  const promoCodes = [
    { code: 'WELCOME20', discount: 20, minOrder: 100, type: 'percentage' },
    { code: 'SAVE50', discount: 50, minOrder: 200, type: 'fixed' },
    { code: 'FIRSTORDER', discount: 15, minOrder: 50, type: 'percentage' },
    { code: 'FREEDELIVERY', discount: deliveryFee, minOrder: 150, type: 'delivery' },
  ];

  // GSAP animations for floating cart
  useEffect(() => {
    if (variant === 'floating' && !showAsPage) {
      if (isOpen) {
        setIsAnimating(true);
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
        gsap.fromTo(
          cartRef.current,
          { x: 400, opacity: 0 },
          { 
            x: 0, 
            opacity: 1, 
            duration: 0.4, 
            ease: 'power2.out',
            onComplete: () => setIsAnimating(false)
          }
        );
      } else {
        setIsAnimating(true);
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in',
        });
        gsap.to(cartRef.current, {
          x: 400,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => setIsAnimating(false)
        });
      }
    }
  }, [isOpen, variant, showAsPage]);

  // Cart button animation when items change
  useEffect(() => {
    if (variant === 'floating' && cartButtonRef.current && totalQuantity > 0) {
      gsap.to(cartButtonRef.current, {
        scale: 1.3,
        duration: 0.2,
        ease: 'back.out(1.7)',
        yoyo: true,
        repeat: 1,
      });
    }
  }, [totalQuantity, variant]);

  const toggleCart = () => {
    if (!isAnimating && variant === 'floating') {
      setIsOpen(!isOpen);
    }
  };

  const handleClose = () => {
    if (variant === 'floating') {
      setIsOpen(false);
    }
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    
    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase());
    
    if (!promo) {
      showConfirmAlert('Invalid promo code', 'Please check the code and try again', 'error');
      return;
    }
    
    if (getCartSubtotal() < promo.minOrder) {
      showConfirmAlert(
        'Minimum order not met',
        `This promo requires minimum order of ₹${promo.minOrder}`,
        'warning'
      );
      return;
    }
    
    let discount = 0;
    
    if (promo.type === 'percentage') {
      discount = (getCartSubtotal() * promo.discount) / 100;
    } else if (promo.type === 'fixed') {
      discount = promo.discount;
    } else if (promo.type === 'delivery') {
      discount = promo.discount;
    }
    
    setAppliedPromo(promo.code);
    setPromoDiscount(discount);
    
    showSuccessToast(`Promo code applied! Saved ₹${discount.toFixed(2)}`);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
    setPromoCode('');
  };

  const handleClearCart = async () => {
    const result = await showConfirmAlert(
      'Clear Cart?',
      'This will remove all items from your cart. This action cannot be undone.',
      'warning',
      'Clear',
      'Cancel'
    );
    
    if (result.isConfirmed) {
      clearCart();
      if (variant === 'floating') {
        setIsOpen(false);
      }
      showSuccessToast('Cart cleared successfully');
    }
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      showConfirmAlert('Your cart is empty', 'Add some items to proceed to checkout', 'info');
      return;
    }
    
    handleClose();
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    handleClose();
    if (restaurantId && restaurantName) {
      router.push(`/restaurant/${restaurantId}`);
    } else {
      router.push('/restaurants');
    }
  };

  const handleIncrement = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item) {
      updateQuantity(itemId, item.quantity + 1);
    }
  };

  const handleDecrement = (itemId: string) => {
    const item = items.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      updateQuantity(itemId, item.quantity - 1);
    } else {
      removeItem(itemId);
    }
  };

  // Floating Cart Button (only for floating variant)
  if (variant === 'floating' && !isOpen && !showAsPage) {
    return (
      <button
        ref={cartButtonRef}
        onClick={toggleCart}
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group"
        aria-label="Open cart"
      >
        <div className="relative">
          <ShoppingCart size={28} />
          {totalQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-7 w-7 flex items-center justify-center animate-pulse">
              {totalQuantity}
            </span>
          )}
        </div>
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
          <div className="font-semibold">View Cart</div>
          <div className="text-xs text-gray-300">
            {totalQuantity} item{totalQuantity !== 1 ? 's' : ''}
          </div>
        </div>
      </button>
    );
  }

  // Cart Content
  const renderCartContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              <div className="flex items-center gap-2 mt-1">
                <Package size={14} className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {totalQuantity} item{totalQuantity !== 1 ? 's' : ''}
                </span>
                {restaurantName && (
                  <>
                    <span className="text-gray-300">•</span>
                    <Store size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-600">{restaurantName}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {variant === 'floating' && (
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X size={24} className="text-gray-600" />
            </button>
          )}
        </div>

        {/* Delivery Info */}
        {items.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock size={18} className="text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Estimated delivery</p>
                  <p className="text-lg font-bold text-gray-900">{estimatedDeliveryTime} mins</p>
                </div>
              </div>
              <Shield size={18} className="text-green-600" />
            </div>
          </div>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full animate-pulse"></div>
              <ShoppingCart className="absolute inset-0 m-auto text-gray-300" size={64} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Your cart feels light</h3>
            <p className="text-gray-600 max-w-sm mx-auto mb-8">
              Looks like you haven't added any delicious items yet. Let's fix that!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/restaurants"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Home size={20} />
                Browse Restaurants
              </Link>
              {restaurantId && (
                <button
                  onClick={handleContinueShopping}
                  className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  <Store size={20} />
                  Back to Menu
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items List */}
            {items.map((item) => (
              <div key={item.id} className="relative">
                <CartItem
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                  onUpdateInstructions={updateSpecialInstructions}
                  onUpdateAddons={updateAddons}
                  compact={false}
                />
              </div>
            ))}

            {/* Promo Code Section */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 p-5 mt-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-800">Apply Promo Code</h3>
              </div>
              
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-green-800">Promo Applied</p>
                      <p className="text-sm text-green-700">{appliedPromo} • Saved ₹{promoDiscount.toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleApplyPromo}
                    disabled={!promoCode.trim()}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
              )}
              
              {/* Available Promos */}
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Available offers:</p>
                <div className="flex flex-wrap gap-2">
                  {promoCodes.map((promo) => (
                    <div
                      key={promo.code}
                      className="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg text-xs"
                    >
                      <span className="font-medium text-blue-800">{promo.code}</span>
                      <span className="text-blue-600 ml-2">Min. ₹{promo.minOrder}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Order Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalQuantity} items)</span>
                  <span>₹{getCartSubtotal().toFixed(2)}</span>
                </div>
                
                {restaurantName && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                
                {promoDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Promo Discount</span>
                    <span>-₹{promoDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="h-px bg-gray-300 my-2" />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>Total Amount</span>
                  <span>₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Safety Info */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4">
              <div className="flex items-start gap-3">
                <Shield className="text-green-600 mt-0.5" size={20} />
                <div>
                  <p className="font-medium text-green-800">Safe & Secure Checkout</p>
                  <p className="text-sm text-green-700 mt-1">
                    Your payment information is encrypted. We never store your card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {items.length > 0 && (
        <div className="border-t bg-white p-6">
          <div className="space-y-3">
            <button
              onClick={handleProceedToCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
            >
              <CreditCard size={22} />
              Proceed to Checkout • ₹{finalTotal.toFixed(2)}
              <ChevronRight size={22} />
            </button>
            
            <div className="flex gap-3">
              <button
                onClick={handleContinueShopping}
                className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={20} />
                Continue Shopping
              </button>
              
              <button
                onClick={handleClearCart}
                className="flex-1 py-3 border border-red-500 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render based on variant
  if (variant === 'page' || showAsPage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <Link
              href="/restaurants"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Restaurants
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {renderCartContent()}
            </div>
            
            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-600">
                              {item.quantity} × ₹{item.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-800">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{getCartSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery</span>
                    <span>₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="h-px bg-gray-300 my-2" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
                >
                  Place Order
                </button>
                
                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={16} />
                    <span>Delivery in {estimatedDeliveryTime} mins</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Shield size={16} />
                    <span>100% Secure Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Floating Cart Sidebar
  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 opacity-0 cursor-pointer"
      />

      {/* Cart Sidebar */}
      <div
        ref={cartRef}
        className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white z-50 shadow-2xl transform translate-x-0 opacity-100 overflow-hidden"
      >
        {renderCartContent()}
      </div>
    </>
  );
}