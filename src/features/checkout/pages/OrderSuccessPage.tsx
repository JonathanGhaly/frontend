import { Link } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="max-w-md mx-auto text-center py-16 px-4 animate-fade-in">
      <div className="w-16 h-16 bg-emerald-50 border border-emerald-250 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
        <CheckCircle className="w-8 h-8 text-emerald-500" />
      </div>

      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
        Order Placed!
      </h1>
      
      <p className="mt-2 text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">
        Thank you for your purchase
      </p>

      <p className="mt-4 text-sm text-slate-500 leading-relaxed font-medium">
        Your order has been recorded successfully.
      </p>
      <div className="mt-8 flex flex-col space-y-3">
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-2xl text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </div>
    </div>
  );
}
