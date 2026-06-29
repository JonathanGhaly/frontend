import { useParams, Link } from "react-router-dom";
import { useAdminOrder } from "../hooks/useAdminOrders";
import {
    OrderStatus,
    orderStatusLabels,
} from "../types";
import { ArrowLeft, Clock, ShoppingBag, MapPin } from "lucide-react";

export default function AdminOrderDetailsPage() {
    const { id = "" } = useParams();
    const { data: order, isLoading } = useAdminOrder(id);

    if (isLoading) {
        return (
            <div className="flex justify-center py-16">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-md mx-auto text-center py-16 px-4">
                <h2 className="text-xl font-bold text-slate-800">Order not found</h2>
                <Link to="/admin/orders" className="text-indigo-605 hover:underline font-bold mt-4 inline-block">
                    Back to Orders
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in space-y-6">
            <div className="flex items-center space-x-3">
                <Link to="/admin/orders" className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-650 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                        Order Details
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                        Inspect Order Records
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Details cells */}
                <div className="bg-white border border-slate-205 rounded-[2rem] p-6 shadow-xs">
                    <div className="flex items-center space-x-2 text-slate-405">
                        <Clock className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Date & Time</span>
                    </div>
                    <p className="font-mono font-bold text-slate-900 mt-2 text-sm">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString() : "Unknown"}
                    </p>
                </div>

                <div className="bg-white border border-slate-205 rounded-[2rem] p-6 shadow-xs">
                    <div className="flex items-center space-x-2 text-slate-405">
                        <ShoppingBag className="w-4 h-4 text-indigo-600" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Session Status</span>
                    </div>
                    <p className="font-bold text-indigo-750 mt-2 text-sm">
                        {orderStatusLabels[order.status] || order.status}
                    </p>
                </div>

                <div className="bg-white border border-slate-205 rounded-[2rem] p-6 shadow-xs">
                    <div className="flex items-center space-x-2 text-slate-405">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Order Value</span>
                    </div>
                    <p className="font-mono font-bold text-slate-900 mt-2 text-sm">
                        ${(order.total ?? 0).toFixed(2)}
                    </p>
                </div>
            </div>

            {order.notes && (
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 shadow-xs">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Customer Notes</h3>
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed font-medium">{order.notes}</p>
                </div>
            )}

            {/* Address Details */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 shadow-xs">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Shipping Destination</h3>
                <div className="text-sm text-slate-700 leading-relaxed font-medium space-y-1">
                    <p>{order.shippingAddress?.street}</p>
                    <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
                    <p>{order.shippingAddress?.country}</p>
                </div>
            </div>

            {/* Products grid */}
            <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 shadow-xs space-y-4">
                <h2 className="font-extrabold text-xs text-slate-950 uppercase tracking-widest font-display pb-2 border-b border-slate-100">
                    Ordered items
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.items?.map((item) => (
                        <div
                            key={item.productId}
                            className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4 flex justify-between items-center"
                        >
                            <div>
                                <h4 className="font-bold text-sm text-slate-900">{item.productName || "Unnamed accessory"}</h4>
                                <p className="text-[10px] font-mono text-slate-400 mt-0.5">ID: {item.productId}</p>
                            </div>
                            <div className="text-right shrink-0">
                                <span className="text-xs font-bold text-slate-700">Qty: {item.quantity}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
