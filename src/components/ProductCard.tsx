/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, ShoppingBag, Eye, Info } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
}

export default function ProductCard({ product, onQuickView, onAddToCart }: ProductCardProps) {
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md hover:border-indigo-400 transition-all duration-300"
    >
      {/* Product Image Section */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Hover Actions Overlay (Desktop) */}
        <div className="absolute inset-0 bg-slate-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2.5 duration-300">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white hover:bg-slate-50 text-slate-900 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
            title="Quick View"
          >
            <Eye className="w-4 h-4 text-indigo-600" />
          </button>
          {!isOutOfStock && (
            <button
              onClick={() => onAddToCart(product)}
              className="p-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-200"
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Tags / Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-1.5">
          {product.featured && (
            <span className="bg-indigo-600 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              Featured
            </span>
          )}
          {isOutOfStock ? (
            <span className="bg-slate-800 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              Sold Out
            </span>
          ) : isLowStock ? (
            <span className="bg-amber-500 text-slate-950 text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm">
              Only {product.stock} left
            </span>
          ) : null}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="mt-1 font-bold text-base text-slate-900 tracking-tight line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>

          {/* Ratings */}
          <div className="flex items-center space-x-1 mt-1">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-slate-800">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="font-extrabold text-slate-900 text-lg font-mono">
            ${product.price.toFixed(2)}
          </div>
          
          {/* Mobile Actions: Simple link to Quickview or directly Add */}
          <div className="flex md:hidden space-x-1.5">
            <button
              onClick={() => onQuickView(product)}
              className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-all"
            >
              <Info className="w-4 h-4" />
            </button>
            {!isOutOfStock && (
              <button
                onClick={() => onAddToCart(product)}
                className="p-1.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => onQuickView(product)}
            className="hidden md:inline-flex text-[11px] font-bold text-indigo-600 hover:text-indigo-800 uppercase tracking-wider hover:underline"
          >
            Quick Spec
          </button>
        </div>
      </div>
    </div>
  );
}
