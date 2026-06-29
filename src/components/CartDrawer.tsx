/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, type FormEvent } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Gift } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  onCheckout,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  const cartItems = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  
  // Promo code system: DOTNETDEMO offers 15% off
  const discountRate = appliedPromo === 'DOTNETDEMO' ? 0.15 : 0;
  const discountAmount = subtotal * discountRate;
  
  const shippingThreshold = 150;
  const isFreeShipping = subtotal >= shippingThreshold || subtotal === 0;
  const shippingFee = isFreeShipping ? 0 : 15;
  const taxRate = 0.08; // 8% tax
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const total = subtotal - discountAmount + shippingFee + taxAmount;

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    if (promoCode.trim().toUpperCase() === 'DOTNETDEMO') {
      setAppliedPromo('DOTNETDEMO');
      setPromoCode('');
    } else {
      setPromoError('Invalid promo code. Try "DOTNETDEMO"');
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    const existing = cartItems.find((x) => x.productId === productId);
    if (existing) {
      if (newQty <= 0) {
        removeItem(productId);
      } else if (newQty > existing.quantity) {
        increaseQuantity(productId);
      } else {
        decreaseQuantity(productId);
      }
    }
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex justify-end animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-slide-in font-sans border-l border-slate-200">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600" />
            <h2 className="font-black text-slate-900 text-base font-display uppercase tracking-wider">
              Your Cart ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-900 transition-colors border border-slate-205"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Items Stack */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 py-12">
              <ShoppingBag className="w-12 h-12 text-slate-300 stroke-1" />
              <div className="text-center">
                <p className="font-extrabold text-slate-900 text-sm font-display uppercase tracking-wider">Your cart is empty</p>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed max-w-[240px] mx-auto">Explore our premium catalog to add goods.</p>
              </div>
              <button
                onClick={onClose}
                className="mt-4 border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold py-2.5 px-6 rounded-xl transition-colors uppercase tracking-wider"
              >
                Start Browsing
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-start space-x-4 pb-4 border-b border-slate-100 last:border-b-0"
              >
                {/* Thumb */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-200">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="font-extrabold text-slate-900 text-xs leading-normal line-clamp-1">
                    {item.name}
                  </h3>
                  <div className="mt-2.5 flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900 text-xs font-bold"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-slate-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-500 hover:text-slate-900 text-xs font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Price and delete */}
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-xs text-slate-800">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Calculations & Checkout */}
        {cartItems.length > 0 && (
          <div className="bg-slate-50 p-5 border-t border-slate-200 space-y-4">
            {/* Promo Codes */}
            <form onSubmit={handleApplyPromo} className="flex space-x-2">
              <input
                type="text"
                placeholder="PROMO CODE (DOTNETDEMO)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                disabled={!!appliedPromo}
                className="flex-1 bg-white border border-slate-205 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono font-bold uppercase placeholder:text-slate-350 text-slate-800"
              />
              <button
                type="submit"
                disabled={!!appliedPromo}
                className="bg-slate-900 text-white font-mono font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-slate-800 disabled:opacity-55 transition-colors uppercase tracking-wider cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Promo State feedbacks */}
            {appliedPromo && (
              <div className="flex items-center justify-between text-xs bg-indigo-50 border border-indigo-150 p-2.5 rounded-xl text-indigo-805 font-bold">
                <div className="flex items-center space-x-1.5">
                  <Gift className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>Promo <strong className="font-mono font-black">{appliedPromo}</strong> (15% off) applied!</span>
                </div>
                <button
                  type="button"
                  onClick={removePromo}
                  className="text-slate-400 hover:text-rose-500 text-[10px] font-bold uppercase tracking-wider"
                >
                  Remove
                </button>
              </div>
            )}

            {promoError && (
              <div className="text-[10px] text-rose-500 font-bold uppercase tracking-wider px-1">
                {promoError}
              </div>
            )}

            {/* Price breakdown */}
            <div className="space-y-2.5 text-xs font-medium text-slate-600 border-b border-slate-200/60 pb-3">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-mono font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-indigo-650">
                  <span>Promo Code Discount (15%)</span>
                  <span className="font-mono font-bold">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping Fees</span>
                <span>
                  {isFreeShipping ? (
                    <strong className="text-emerald-500 uppercase tracking-widest text-[9px] font-black">Free</strong>
                  ) : (
                    <span className="font-mono font-bold text-slate-900">${shippingFee.toFixed(2)}</span>
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-mono font-bold text-slate-900">${taxAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-1">
              <span className="text-xs font-bold text-slate-900">Total Amount</span>
              <span className="text-lg font-black font-mono text-indigo-600">${total.toFixed(2)}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
