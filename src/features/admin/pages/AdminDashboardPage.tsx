import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../catalog/hooks/useCategories";
import { useProducts } from "../../catalog/hooks/useProducts";
import { useAdminOrders } from "../hooks/useAdminOrders";
import { Database, Package, Sliders, ShoppingBag, Terminal } from "lucide-react";

export default function AdminDashboardPage() {
    const { data: products } = useProducts();
    const { data: categories = [] } = useCategories();
    const { data: orders = [] } = useAdminOrders();

    const stats = useMemo(
        () => [
            {
                label: "Products Catalog",
                value: products?.totalCount ?? 0,
                link: "/admin/products",
                icon: <Package className="w-5 h-5 text-indigo-650" />,
                bg: "bg-white",
            },
            {
                label: "Categories Managed",
                value: categories.length,
                link: "/admin/categories",
                icon: <Sliders className="w-5 h-5 text-emerald-600" />,
                bg: "bg-white",
            },
            {
                label: "Total Orders Submitted",
                value: orders.length,
                link: "/admin/orders",
                icon: <ShoppingBag className="w-5 h-5 text-indigo-500" />,
                bg: "bg-white",
            },
        ],
        [categories.length, orders.length, products?.totalCount]
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-8">
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                    Admin Command Hub
                </h1>
                <p className="mt-1 text-xs text-slate-455 font-bold uppercase tracking-widest font-mono">
                    System Control Dashboard
                </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        to={stat.link}
                        className={`${stat.bg} border border-slate-200 rounded-[2rem] p-6 shadow-sm hover:shadow-md hover:border-indigo-400 hover:scale-[1.01] transition-all flex flex-col justify-between min-h-[160px]`}
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl">
                                {stat.icon}
                            </div>
                            <span className="text-[9px] font-extrabold text-slate-400 font-mono tracking-widest uppercase">
                                CONTROL
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-450 uppercase tracking-wider">
                                {stat.label}
                            </p>
                            <h2 className="text-3xl font-black font-mono text-slate-900 mt-1">
                                {stat.value}
                            </h2>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Navigation links */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-xs">
                <div className="flex items-center space-x-2 text-slate-900 mb-6">
                    <Terminal className="w-5 h-5 text-indigo-600" />
                    <h2 className="font-extrabold text-sm uppercase tracking-wider font-display">
                        Quick Console Operations
                    </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link
                        to="/admin/products"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                    >
                        Manage Products
                    </Link>
                    <Link
                        to="/admin/categories"
                        className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-5 rounded-2xl text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                    >
                        Manage Categories
                    </Link>
                    <Link
                        to="/admin/orders"
                        className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-3 px-5 rounded-2xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                        Manage Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}
