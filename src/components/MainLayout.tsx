import { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Terminal, Search, Database } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useUiStore } from '../store/uiStore';
import CartDrawer from './CartDrawer';
import DeveloperPanel from './DeveloperPanel';

export default function MainLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDevOpen, setIsDevOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { searchQuery, setSearchQuery } = useUiStore();
  const cartTotalItems = useCartStore((state) => state.totalItems());
  const { user, logout } = useAuthStore();

  const isAdmin = user?.roles?.includes('Admin');

  // Handle connection config updates
  const handleConfigChange = () => {
    // Notify Axios configuration dynamically
    const savedConfig = localStorage.getItem('dotnet_api_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        // Dispatch custom event to trigger reloading of current page if needed
        window.dispatchEvent(new Event('api-config-changed'));
      } catch (e) {
        // do nothing
      }
    }
  };

  const handleCheckoutNav = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const savedConfig = localStorage.getItem('dotnet_api_config');
  const apiConfig = savedConfig ? JSON.parse(savedConfig) : { useMockFallback: true, baseUrl: '' };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between selection:bg-indigo-650 selection:text-white">

      {/* Main Interactive Header Navbar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <Link
            to="/"
            className="flex items-center space-x-2.5 text-left focus:outline-none focus:ring-2 focus:ring-indigo-500/10 rounded-xl p-1"
          >
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-xs">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-slate-900 block text-sm leading-none font-display">
                SHOPIY<span className="text-indigo-600">STORE</span>
              </span>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                Bento Workspace
              </span>
            </div>
          </Link>

          {/* Search bar (Only shows on Store/Catalog view) */}
          {(location.pathname === '/' || location.pathname === '/catalog') && (
            <div className="hidden md:flex flex-1 max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search premium workspace accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 font-medium"
              />
            </div>
          )}

          {/* Navbar Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Storefront View */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xs font-bold px-4 py-2.5 rounded-xl transition-all font-display uppercase tracking-wider ${
                  isActive
                    ? 'text-indigo-700 bg-indigo-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              Shop
            </NavLink>

            {user && (
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `text-xs font-bold px-4 py-2.5 rounded-xl transition-all font-display uppercase tracking-wider ${
                    isActive
                      ? 'text-indigo-700 bg-indigo-50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                Orders
              </NavLink>
            )}

            {/* Admin Console Switcher */}
            {isAdmin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `text-xs font-bold px-4 py-2.5 rounded-xl transition-all font-display uppercase tracking-wider ${
                    isActive
                      ? 'text-indigo-705 bg-indigo-50'
                      : 'text-slate-650 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                Admin
              </NavLink>
            )}

            {/* Logout Trigger */}
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="text-xs font-bold px-4 py-2.5 rounded-xl text-slate-600 hover:text-rose-600 hover:bg-slate-100 transition-all font-display uppercase tracking-wider cursor-pointer"
            >
              Logout
            </button>




            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-700 hover:text-slate-900 transition-all relative shadow-xs cursor-pointer"
              title="Open shopping cart"
            >
              <ShoppingBag className="w-4 h-4 text-slate-850" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-650 text-white font-black px-1.5 py-0.5 rounded-full text-[9px] min-w-[18px] text-center shadow-md">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-xs text-slate-450 font-bold uppercase tracking-widest font-mono">
          <div>
            &copy; {new Date().getFullYear()} SHOPIYSTORE. All rights reserved.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <span className="text-indigo-650 hover:underline cursor-pointer">Security Spec</span>
            <span>&middot;</span>
            <span className="text-indigo-650 hover:underline cursor-pointer">REST API Bridge</span>
          </div>
        </div>
      </footer>

      {/* Drawer components */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckoutNav}
      />

      <DeveloperPanel
        isOpen={isDevOpen}
        onClose={() => setIsDevOpen(false)}
        onConfigChange={handleConfigChange}
      />
    </div>
  );
}
