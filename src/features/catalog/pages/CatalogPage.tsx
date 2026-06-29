import { useState, useMemo } from 'react';
import {
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Database,
  ArrowRight,
  ChevronDown,
  Search
} from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useCartStore } from '../../../store/cartStore';
import { useUiStore } from '../../../store/uiStore';
import ProductCard from '../../../components/ProductCard';
import QuickViewModal from '../../../components/QuickViewModal';
import { Product } from '../types';

export default function CatalogPage() {
  const { searchQuery, setSearchQuery } = useUiStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Zustand Cart Store
  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const cartTotalItems = useCartStore((state) => state.totalItems());

  // Fetch Categories & Products from API
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: productsData, isLoading: isLoadingProducts, error: productsError } = useProducts({
    categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
    search: searchQuery || undefined,
  });

  const productsList = productsData?.items ?? [];

  // Local Sort / Filter if API does not sort fully
  const sortedProducts = useMemo(() => {
    let list = [...productsList];
    if (sortBy === 'price-asc') {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === 'price-desc') {
      return list.sort((a, b) => b.price - a.price);
    }
    return list; // Defaultfeatured sort
  }, [productsList, sortBy]);

  const handleAddToCart = (product: Product, quantity = 1) => {
    // In shopiy frontend, image might be imageUrl
    const image = product.imageUrl || '/favicon.svg';
    addItem({
      productId: product.id,
      name: product.name || 'Unnamed Product',
      image,
      price: product.price,
      quantity,
    });
  };

  // Extract connection details from config
  const savedConfig = localStorage.getItem('dotnet_api_config');
  const apiConfig = savedConfig ? JSON.parse(savedConfig) : { useMockFallback: true, baseUrl: '' };

  return (
    <div className="animate-fade-in pb-16">
      {/* BENTO GRID HERO & METRICS HUB */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hero Bento Cell */}
          <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-10 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[380px] group transition-all hover:shadow-sm hover:border-slate-300">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-full text-[10px] text-indigo-700 font-extrabold uppercase tracking-widest font-mono">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>PROMO: 15% Off with code DOTNETDEMO</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight font-display tracking-tight">
                Nordic Pro<br />Workspace Objects
              </h1>
              
              <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-md font-medium">
                Minimalist design meets .NET efficiency. Meticulously styled to support clean lines, rich natural textures, and real-time stock sync controllers.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 z-10 mt-6">
              <button
                onClick={() => {
                  const target = document.getElementById('products-explore');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center space-x-2 cursor-pointer"
              >
                <span>Explore Accessories</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Decorative right graphic mockup */}
            <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 w-64 h-64 rounded-[2rem] overflow-hidden border border-slate-200 shadow-xl rotate-3 group-hover:rotate-1 group-hover:scale-105 transition-all duration-500">
              <img
                src="https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400"
                alt="Workspace Keyboard Showcase"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Geometric blobs */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-indigo-50 rounded-full mix-blend-multiply opacity-60 blur-2xl pointer-events-none"></div>
            <div className="absolute right-10 top-10 w-48 h-48 bg-emerald-50 rounded-full mix-blend-multiply opacity-60 blur-2xl pointer-events-none"></div>
          </div>

          {/* Right Hand Stats Bento Cells */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">

            {/* Stat Card 2: Shopping Session */}
            <div className="bg-white rounded-[2.25rem] border border-slate-200 p-6 flex flex-col justify-between shadow-xs relative overflow-hidden group hover:scale-[1.01] transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-slate-100 rounded-2xl text-indigo-600">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest font-mono bg-slate-100 px-2.5 py-1 rounded-full">
                  ACTIVE_SESSION
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-black text-slate-900 font-display tracking-tight">
                  {cartTotalItems} {cartTotalItems === 1 ? 'Item' : 'Items'}
                </h3>
                <p className="text-emerald-500 text-xs mt-1.5 font-bold flex items-center space-x-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  <span>Ready for local orders log</span>
                </p>
              </div>
              <div className="absolute -right-12 -bottom-12 w-32 h-32 bg-slate-50 rounded-full opacity-50 blur-lg pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT CATALOG WORKSPACE */}
      <section id="products-explore" className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Filter Sidebar */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xs h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2 text-slate-900">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <h2 className="font-extrabold text-sm uppercase tracking-wider font-display">Refine</h2>
            </div>
            {(selectedCategory !== 'all' || searchQuery || sortBy !== 'featured') && (
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setSortBy('featured');
                }}
                className="text-xs text-indigo-600 font-extrabold hover:underline uppercase tracking-wider"
              >
                Reset
              </button>
            )}
          </div>

          {/* Search */}
          <div className="space-y-2">
            <label htmlFor="sidebar-search" className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Search Accessories
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="sidebar-search"
                type="text"
                placeholder="Type keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Categories
            </label>
            <div className="flex flex-wrap lg:flex-col gap-1.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`text-xs px-3.5 py-2.5 rounded-xl text-left font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-indigo-600 text-white font-extrabold shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                }`}
              >
                All Items
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-xs px-3.5 py-2.5 rounded-xl text-left font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white font-extrabold shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sort dropdown */}
          <div className="space-y-2">
            <label htmlFor="dotnet-sort" className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              Sort By
            </label>
            <div className="relative">
              <select
                id="dotnet-sort"
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500 appearance-none cursor-pointer"
              >
                <option value="featured">Featured / Suggested</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Column: Products Grid */}
        <div className="lg:col-span-9 space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
            <span>
              Showing {sortedProducts.length} beautiful items
            </span>
          </div>

          {isLoadingProducts ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden p-5 space-y-4 animate-pulse">
                  <div className="aspect-square bg-slate-100 rounded-[1.5rem] w-full" />
                  <div className="h-4 bg-slate-100 rounded w-2/3" />
                  <div className="h-3 bg-slate-100 rounded w-1/2" />
                  <div className="h-6 bg-slate-100 rounded w-1/4" />
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 text-center max-w-md mx-auto shadow-xs">
              <Search className="w-8 h-8 text-slate-300 mx-auto stroke-1 mb-3" />
              <h3 className="font-extrabold text-slate-900 text-sm font-display uppercase tracking-wider">No items found</h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">Try refining your search terms or choosing another category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {sortedProducts.map((prod) => {
                // Map API product fields to product card expected structure
                const cardProduct = {
                  id: prod.id,
                  name: prod.name || 'Unnamed',
                  description: prod.description || '',
                  price: prod.price,
                  category: categories.find(c => c.id === prod.categoryId)?.name || 'General',
                  image: prod.imageUrl || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=400',
                  rating: 4.8,
                  reviewsCount: 140,
                  stock: prod.stockQuantity ?? 10,
                  featured: true,
                  metadata: prod.metadata,
                  sku: prod.sku,
                  currency: prod.currency,
                  isActive: prod.isActive
                };

                return (
                  <ProductCard
                    key={prod.id}
                    product={cardProduct}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p, 1)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* SPEC DETAIL MODAL */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(p, q) => {
            handleAddToCart(p, q);
            setQuickViewProduct(null);
          }}
        />
      )}
    </div>
  );
}
