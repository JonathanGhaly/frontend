import { Link } from "react-router-dom";
import { useUserOrders } from "../hooks/useUserOrders";
import { orderStatusLabels, OrderStatus } from "../../admin/types";
import { ArrowLeft, Calendar, ShoppingBag, Truck, CheckCircle2, AlertCircle } from "lucide-react";

export default function OrderHistoryPage() {
    const { data: orders = [], isLoading, error } = useUserOrders();

    const getStatusColor = (status: string) => {
        switch (status) {
            case OrderStatus.Delivered:
                return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
            case OrderStatus.Shipped:
                return "bg-amber-50 text-amber-700 border-amber-200/50";
            case OrderStatus.Paid:
                return "bg-indigo-50 text-indigo-700 border-indigo-200/50";
            case OrderStatus.Cancelled:
            case OrderStatus.Refunded:
                return "bg-rose-50 text-rose-700 border-rose-200/50";
            default:
                return "bg-slate-50 text-slate-700 border-slate-200/50";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case OrderStatus.Delivered:
                return <CheckCircle2 className="w-3.5 h-3.5" />;
            case OrderStatus.Shipped:
                return <Truck className="w-3.5 h-3.5" />;
            case OrderStatus.Paid:
                return <CheckCircle2 className="w-3.5 h-3.5" />;
            default:
                return <AlertCircle className="w-3.5 h-3.5" />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in space-y-8">
            {/* Header Area */}
            <div className="flex items-center space-x-4">
                <Link
                    to="/"
                    className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-500 hover:text-indigo-600 transition-all shadow-xs cursor-pointer"
                    title="Return to Shop"
                >
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight font-display">
                        My Purchase History
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        Overview of your completed and active order records
                    </p>
                </div>
            </div>

            {/* Error state */}
            {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-[1.5rem] flex items-center space-x-3 text-rose-700 text-sm">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Failed to load purchase history. Please verify your connection setup.</span>
                </div>
            )}

            {/* Loader */}
            {isLoading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : orders.length === 0 ? (
                /* Empty state */
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-450">
                        <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-extrabold text-slate-900 text-base font-display">No purchases yet</h3>
                        <p className="text-xs text-slate-450 mt-1 font-medium">When you purchase accessories, they will register in this history grid.</p>
                    </div>
                    <Link
                        to="/"
                        className="inline-block bg-indigo-650 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-md transition-all duration-300"
                    >
                        Browse Products
                    </Link>
                </div>
            ) : (
                /* Orders list */
                <div className="space-y-6">
                    {orders.map((order) => (
                        <article
                            key={order.id}
                            className="bg-white border border-slate-200 rounded-[2.25rem] p-6 md:p-8 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-300 space-y-6"
                        >
                            {/* Card Top Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest font-mono">
                                        Record Locked
                                    </span>
                                    <h3 className="text-lg font-black text-slate-900 font-display">
                                        Order #{order.orderId || order.id.slice(0, 8)}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="flex items-center space-x-1.5 text-xs text-slate-450 font-bold font-mono">
                                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                        <span>{order.placedAt ? new Date(order.placedAt).toLocaleDateString(undefined, { dateStyle: 'medium' }) : "Date missing"}</span>
                                    </span>
                                    <span className={`inline-flex items-center space-x-1.5 border px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider font-mono ${getStatusColor(order.status)}`}>
                                        {getStatusIcon(order.status)}
                                        <span>{orderStatusLabels[order.status] || order.status}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Order Items Summary */}
                            <div className="space-y-3">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                                    Purchased Items
                                </h4>
                                <div className="divide-y divide-slate-100">
                                    {order.items?.map((item) => (
                                        <div key={item.id} className="py-2.5 flex items-center justify-between text-xs text-slate-700 font-medium">
                                            <div className="flex items-center space-x-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                                                <span>{item.productName || "Product Name missing"}</span>
                                                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
                                                    x{item.quantity}
                                                </span>
                                            </div>
                                            <span className="font-mono font-bold text-slate-800">
                                                ${((item.unitPrice ?? 0) * (item.quantity ?? 1)).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Costs Block */}
                            <div className="bg-slate-50/70 border border-slate-200/50 rounded-2xl p-4 flex flex-col sm:flex-row justify-between gap-4">
                                <div className="text-xs text-slate-500 font-medium space-y-1">
                                    <p>Shipping Address: <strong className="text-slate-700">{order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.country}</strong></p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                        <span>Subtotal: ${(order.subtotal ?? 0).toFixed(2)}</span>
                                        <span>&middot;</span>
                                        <span>Shipping: ${(order.shipping ?? 0).toFixed(2)}</span>
                                        <span>&middot;</span>
                                        <span>Tax: ${(order.tax ?? 0).toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col justify-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Charged</span>
                                    <span className="font-mono font-extrabold text-indigo-750 text-lg">
                                        ${(order.total ?? 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
