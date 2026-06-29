/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { X, Star, ShieldCheck, Truck, RefreshCw, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size?: string, color?: string) => void;
}

export default function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) return null;

  // Extract sizes dynamically from metadata
  const sizes: string[] = Array.isArray(product.metadata?.sizes)
    ? product.metadata.sizes.map(String)
    : typeof product.metadata?.size === 'string' || typeof product.metadata?.size === 'number'
      ? [String(product.metadata.size)]
      : [];

  // Extract colors dynamically from metadata
  const colors: string[] = Array.isArray(product.metadata?.colors)
    ? product.metadata.colors.map(String)
    : typeof product.metadata?.color === 'string'
      ? [product.metadata.color]
      : [];

  useEffect(() => {
    if (product) {
      setSelectedSize(sizes[0] || '');
      setSelectedColor(colors[0] || '');
      setQuantity(1);
    }
  }, [product?.id]);

  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleIncrease = () => {
    const maxStock = product.stock ?? product.stockQuantity ?? 10;
    setQuantity((q) => (q < maxStock ? q + 1 : q));
  };

  const isOutOfStock = (product.stock ?? product.stockQuantity ?? 0) === 0;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize || undefined, selectedColor || undefined);
    onClose();
  };

  return (
    <div
      id="quick-view-modal-overlay"
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-500 hover:text-slate-900 transition-colors border border-slate-200 cursor-pointer"
          title="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Product Gallery Section */}
          <div className="md:col-span-5 bg-slate-50 relative aspect-square md:aspect-auto md:h-full min-h-[300px]">
            <img
              src={product.imageUrl || product.image || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600'}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Product Details Section */}
          <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Category */}
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
                  {product.category || 'Product'}
                </span>
                {(product.stock ?? product.stockQuantity ?? 0) > 0 && (product.stock ?? product.stockQuantity ?? 0) <= 5 && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg">
                    Low Stock: {product.stock ?? product.stockQuantity} units remaining
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="mt-3 text-2xl font-black text-slate-900 leading-tight font-display tracking-tight uppercase">
                {product.name}
              </h2>

              {/* Ratings */}
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-bold text-slate-800">4.8</span>
                <span className="text-xs text-slate-400 font-medium">(142 verified reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4 text-2xl font-black text-slate-950 font-mono tracking-tight text-indigo-600">
                ${product.price.toFixed(2)}
              </div>

              {/* Description */}
              <p className="mt-4 text-xs md:text-sm text-slate-500 leading-relaxed font-medium">
                {product.description}
              </p>

              {/* Size Option (Only if dynamic size metadata exists) */}
              {sizes.length > 0 && (
                <div className="mt-5 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select Size
                  </label>
                  <div className="flex space-x-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 text-xs font-bold rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Options (Only if dynamic color metadata exists) */}
              {colors.length > 0 && (
                <div className="mt-4 space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Color / Finish
                  </label>
                  <div className="flex space-x-2.5">
                    {colors.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`w-8 h-8 rounded-xl border border-slate-200 transition-all font-bold text-[10px] px-2 text-slate-700 bg-slate-50 flex items-center justify-center hover:bg-slate-100 cursor-pointer ${
                          selectedColor === c ? 'ring-2 ring-indigo-600 ring-offset-2 scale-105 bg-indigo-50 border-indigo-300 text-indigo-705' : 'opacity-85'
                        }`}
                        title={c}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Frame */}
            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center space-x-4">
              {/* Quantity Adjuster */}
              {!isOutOfStock && (
                <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    disabled={isOutOfStock}
                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-50 text-lg font-semibold transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-bold text-slate-800">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrease}
                    disabled={isOutOfStock}
                    className="w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 disabled:opacity-50 text-lg font-semibold transition-colors"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Action Button */}
              {isOutOfStock ? (
                <button
                  disabled
                  className="flex-1 bg-slate-100 text-slate-400 border border-slate-200 font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider cursor-not-allowed text-center"
                >
                  Sold Out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 bg-indigo-650 hover:bg-indigo-750 text-white font-bold py-3.5 px-6 rounded-xl text-xs uppercase tracking-wider shadow-sm active:scale-[0.98] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart &middot; ${(product.price * quantity).toFixed(2)}</span>
                </button>
              )}
            </div>

            {/* Security/Delivery Badges */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-slate-400 font-bold text-center">
              <div className="flex items-center justify-center space-x-1.5 py-2 px-1 bg-slate-50 rounded-lg border border-slate-100">
                <Truck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Free Ship</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5 py-2 px-1 bg-slate-50 rounded-lg border border-slate-100">
                <RefreshCw className="w-3.5 h-3.5 text-indigo-500" />
                <span>30-Day Return</span>
              </div>
              <div className="flex items-center justify-center space-x-1.5 py-2 px-1 bg-slate-50 rounded-lg border border-slate-100">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Secure SSL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
