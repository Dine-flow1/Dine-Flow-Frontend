'use client';

import { useState } from 'react';
import { useCart } from '@/app/Context/CartContext';
import { 
  Calculator, 
  Tag, 
  Truck, 
  Shield, 
  CreditCard, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Info,
  Gift
} from 'lucide-react';
import { showInfoAlert } from '@/utils/sweetAlert';

interface CartSummaryProps {
  showDetails?: boolean;
  compact?: boolean;
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
}

export default function CartSummary({ 
  showDetails = true, 
  compact = false,
  showCheckoutButton = true,
  onCheckout 
}: CartSummaryProps) {
  const { 
    items, 
    totalQuantity, 
    getCartSubtotal, 
    getCartTotal,
    restaurantName 
  } = useCart();
  
  const [showBreakdown, setShowBreakdown] = useState(!compact);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const deliveryFee = restaurantName ? 49 : 0;
  const tax = getCartSubtotal() * 0.18; // 18% GST
  const packagingFee = items.length > 0 ? 19 : 0;
  const platformFee = items.length > 0 ? 9 : 0;
  
  const subtotal = getCartSubtotal();
  const total = subtotal + deliveryFee + tax + packagingFee + platformFee - promoDiscount;

  // Promo codes
  const promoCodes = [
    { code: 'WELCOME20', discount: 20, minOrder: 299, type: 'percentage', desc: '20% off on first order' },
    { code: 'SAVE50', discount: 50, minOrder: 499, type: 'fixed', desc: 'Flat ₹50 off' },
    { code: 'FREEDEL', discount: deliveryFee, minOrder: 399, type: 'delivery', desc: 'Free delivery' },
    { code: 'WEEKEND25', discount: 25, minOrder: 599, type: 'percentage', desc: '25% off on weekends' },
  ];

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;

    const promo = promoCodes.find(p => p.code === promoCode.toUpperCase());
    
    if (!promo) {
      showInfoAlert('Invalid promo code', 'Please check the code and try again');
      return;
    }
    
    if (subtotal < promo.minOrder) {
      showInfoAlert(
        'Minimum order not met',
        `This promo requires minimum order of ₹${promo.minOrder}`
      );
      return;
    }
    
    let discount = 0;
    
    if (promo.type === 'percentage') {
      discount = (subtotal * promo.discount) / 100;
    } else if (promo.type === 'fixed') {
      discount = promo.discount;
    } else if (promo.type === 'delivery') {
      discount = deliveryFee;
    }
    
    setAppliedPromo(promo.code);
    setPromoDiscount(discount);
    setPromoCode('');
    setShowPromoInput(false);
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
  };

  const handleShowPromoInput = () => {
    setShowPromoInput(!showPromoInput);
  };

  if (compact) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-gray-800">Order Total</h3>
          <span className="text-xl font-bold text-gray-900">₹{total.toFixed(2)}</span>
        </div>
        
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Items ({totalQuantity})</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          {deliveryFee > 0 && (
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
          )}
          {appliedPromo && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{promoDiscount.toFixed(2)}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calculator className="text-blue-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
          </div>
          
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showBreakdown ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">₹{total.toFixed(2)}</p>
          </div>
          
          {showCheckoutButton && (
            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <CreditCard size={20} />
              Checkout
            </button>
          )}
        </div>
      </div>

      {/* Breakdown */}
      {showBreakdown && (
        <div className="p-6">
          {/* Items Breakdown */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-gray-600">
              <span>Item Total ({totalQuantity} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            
            {deliveryFee > 0 && (
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  Delivery Fee
                  <Truck size={14} className="text-gray-400" />
                </span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-2">
                Packaging Charges
                <Info size={14} className="text-gray-400" />
              </span>
              <span>₹{packagingFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-2">
                Platform Fee
                <Shield size={14} className="text-gray-400" />
              </span>
              <span>₹{platformFee.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-gray-600">
              <span>GST (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
          </div>

          {/* Promo Code Section */}
          <div className="mb-6">
            {appliedPromo ? (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Gift className="text-green-600" size={18} />
                    <div>
                      <p className="font-medium text-green-800">{appliedPromo} Applied</p>
                      <p className="text-sm text-green-700">
                        Discount: ₹{promoDiscount.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={handleShowPromoInput}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-3"
                >
                  <Tag size={18} />
                  {showPromoInput ? 'Cancel' : 'Apply Promo Code'}
                </button>
                
                {showPromoInput && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleApplyPromo}
                      disabled={!promoCode.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Available Promos */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Available Offers</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {promoCodes.slice(0, 4).map((promo) => (
                <div
                  key={promo.code}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    appliedPromo === promo.code
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                  onClick={() => {
                    setPromoCode(promo.code);
                    if (!appliedPromo) {
                      handleApplyPromo();
                    }
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{promo.code}</p>
                      <p className="text-xs text-gray-600 mt-1">{promo.desc}</p>
                    </div>
                    <span className="text-xs font-medium text-blue-600">
                      Min. ₹{promo.minOrder}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Total */}
          <div className="border-t pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-700">Subtotal</span>
                <span>₹{(subtotal + deliveryFee + packagingFee + platformFee).toFixed(2)}</span>
              </div>
              
              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Promo Discount</span>
                  <span>-₹{promoDiscount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Tax (GST)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              
              <div className="h-px bg-gray-300 my-3" />
              
              <div className="flex justify-between text-xl font-bold">
                <span>Grand Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Shield className="text-blue-600 flex-shrink-0" size={18} />
              <p className="text-blue-800">
                <span className="font-medium">100% Secure Payment</span> • Your payment information is encrypted
              </p>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <Truck className="text-green-600 flex-shrink-0" size={18} />
              <p className="text-green-800">
                <span className="font-medium">Free Delivery</span> • On orders above ₹499
              </p>
            </div>
            
            {subtotal < 499 && deliveryFee > 0 && (
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="text-yellow-600 flex-shrink-0" size={18} />
                <p className="text-yellow-800">
                  <span className="font-medium">Add ₹{(499 - subtotal).toFixed(2)} more</span> to get free delivery!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      {showCheckoutButton && (
        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            <CreditCard size={22} />
            Proceed to Pay ₹{total.toFixed(2)}
          </button>
          
          <p className="text-center text-xs text-gray-500 mt-3">
            By continuing, you agree to our Terms & Conditions
          </p>
        </div>
      )}
    </div>
  );
}