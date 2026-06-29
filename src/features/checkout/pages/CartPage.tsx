import { Link } from 'react-router-dom';
import { useCartStore } from '../../../store/cartStore';
import { Trash2, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.totalPrice());
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 px-4">
        <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto stroke-1 mb-4" />
        <h2 className="text-xl font-bold text-slate-800 font-display uppercase tracking-wider">Your Cart is Empty</h2>
        <p className="text-xs text-slate-450 mt-2 leading-relaxed">You haven't added any accessories yet. Explore our workspace products to get started.</p>
        <Link to="/" className="mt-6 inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all">
          <span>Go to Catalog</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-6">
        Shopping Cart Summary
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left list */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-white border border-slate-200 rounded-3xl p-4 flex items-center justify-between gap-4 shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-100 shrink-0"
                />
                <div>
                  <h3 className="font-bold text-sm text-slate-900 line-clamp-1">{item.name}</h3>
                  <p className="text-xs font-mono font-bold text-slate-500 mt-0.5">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50">
                  <button
                    onClick={() => decreaseQuantity(item.productId)}
                    className="px-2 py-1 text-slate-550 font-bold"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-bold text-slate-800 font-mono">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.productId)}
                    className="px-2 py-1 text-slate-550 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="p-2 bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl border border-slate-200/60 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right subtotal card */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xs h-fit space-y-5">
          <h2 className="font-extrabold text-xs text-slate-950 uppercase tracking-widest font-display pb-3 border-b border-slate-100">
            Order Subtotal
          </h2>

          <div className="flex justify-between items-center text-slate-600 text-xs font-medium">
            <span>Items Subtotal</span>
            <span className="font-bold font-mono text-slate-900">${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center text-slate-655 text-xs font-medium">
            <span>Shipping & Delivery</span>
            <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">Free Shipping</span>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-sm font-bold text-slate-905">Total Amount</span>
            <span className="text-xl font-black font-mono text-indigo-700">${total.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="w-full bg-indigo-650 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 mt-4 cursor-pointer"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
