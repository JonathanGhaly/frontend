import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct';
import { useCategories } from '../hooks/useCategories';
import { useCartStore } from '../../../store/cartStore';
import { Star, ShoppingBag, ArrowLeft, CheckCircle, Package } from 'lucide-react';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id || '');
  const { data: categories = [] } = useCategories();
  const addItem = useCartStore((state) => state.addItem);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  // Extract sizes dynamically from metadata
  const sizes: string[] = Array.isArray(product?.metadata?.sizes)
    ? product.metadata.sizes.map(String)
    : typeof product?.metadata?.size === 'string' || typeof product?.metadata?.size === 'number'
      ? [String(product.metadata.size)]
      : [];

  // Extract colors dynamically from metadata
  const colors: string[] = Array.isArray(product?.metadata?.colors)
    ? product.metadata.colors.map(String)
    : typeof product?.metadata?.color === 'string'
      ? [product.metadata.color]
      : [];

  useEffect(() => {
    if (product) {
      setSelectedSize(sizes[0] || '');
      setSelectedColor(colors[0] || '');
      setQuantity(1);
    }
  }, [product?.id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-800">Product not found</h2>
        <Link to="/" className="text-indigo-600 mt-4 inline-block hover:underline font-bold">
          Back to Store
        </Link>
      </div>
    );
  }

  const categoryName = categories.find(c => c.id === product.categoryId)?.name || 'General';
  const imageUrl = product.imageUrl || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600';

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name || 'Unnamed Product',
      image: imageUrl,
      price: product.price,
      quantity,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <Link to="/" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-indigo-650 uppercase tracking-wider mb-6">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to products</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-10 shadow-xs">
        {/* Left: Product Image */}
        <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-100">
          <img
            src={imageUrl}
            alt={product.name || 'Product'}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col justify-between space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              {categoryName}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display mt-2">
              {product.name}
            </h1>

            {/* Ratings */}
            <div className="flex items-center space-x-1.5 mt-3">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-bold text-slate-800">4.8</span>
              <span className="text-xs text-slate-400">(142 Customer Reviews)</span>
            </div>

            <div className="text-3xl font-black font-mono text-slate-900 mt-5">
              ${product.price.toFixed(2)}
            </div>

            <p className="mt-6 text-sm text-slate-500 leading-relaxed font-medium">
              {product.description || 'No description provided for this premium accessory.'}
            </p>
          </div>

          <div className="border-t border-slate-100 pt-6 space-y-5">
            {/* Color Select */}
            {colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Aesthetic Finish
                </label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                        selectedColor === color
                          ? 'border-indigo-650 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Select */}
            {sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Select Size
                </label>
                <div className="flex space-x-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-indigo-650 bg-indigo-50 text-indigo-700'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selection & Cart action */}
            <div className="flex items-center gap-4 mt-6">
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-bold text-slate-800 font-mono">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-500 hover:text-slate-900 font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-650 hover:bg-indigo-750 text-white font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/10 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Session Cart</span>
              </button>
            </div>

            {/* Additional meta */}
            <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-450 uppercase tracking-wider pt-2">
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span>In Stock & Ready</span>
              </span>
              <span className="flex items-center space-x-1">
                <Package className="w-3.5 h-3.5 text-indigo-550" />
                <span>Direct Sync Synapse</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
