import { Link } from "react-router-dom";
import {
    useAdminOrders,
    useUpdateOrderStatus,
} from "../hooks/useAdminOrders";
import {
    OrderStatus,
    orderStatusLabels,
} from "../types";
import { ArrowLeft, Edit } from "lucide-react";

export default function AdminOrdersPage() {
    const { data: orders = [], isLoading } = useAdminOrders();
    const updateStatus = useUpdateOrderStatus();

    const statuses = Object.values(OrderStatus);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-6">
            <div className="flex items-center space-x-3">
                <Link to="/admin" className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-650 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                        Orders Management
                    </h1>
                    <p className="text-[10px] font-bold text-slate-450 uppercase tracking-widest font-mono">
                        Admin Orders Console
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : orders.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-[2rem] p-10 text-center max-w-md mx-auto">
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">No orders found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {orders.map((order) => (
                        <article
                            key={order.id}
                            className="bg-white border border-slate-200 rounded-[2rem] p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                        >
                            <div className="space-y-1">
                                <h3 className="font-extrabold text-slate-900 font-display text-base">
                                    Order #{order.orderId || order.id.slice(0, 8)}
                                </h3>
                                <p className="text-[10px] font-bold text-slate-400 font-mono uppercase tracking-widest">
                                    Placed: {order.placedAt ? new Date(order.placedAt).toLocaleDateString() : "Unknown date"}
                                </p>
                                <p className="text-xs text-slate-500 leading-relaxed max-w-md mt-2">
                                    Shipping to: {order.shippingAddress?.city}, {order.shippingAddress?.country}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-6">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Order Total</p>
                                    <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">
                                        ${(order.total ?? 0).toFixed(2)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</p>
                                    <p className="font-bold text-indigo-700 text-xs mt-0.5">
                                        {orderStatusLabels[order.status] || order.status}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1" htmlFor={`status-${order.id}`}>
                                        Change Status
                                    </label>
                                    <select
                                        id={`status-${order.id}`}
                                        value={order.status}
                                        onChange={(event) =>
                                            updateStatus.mutate({
                                                id: order.id,
                                                status: event.target.value as OrderStatus,
                                            })
                                        }
                                        className="bg-slate-50 border border-slate-205 rounded-xl px-2.5 py-1.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>
                                                {orderStatusLabels[status] || status}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <Link
                                    to={`/admin/orders/${order.id}`}
                                    className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all"
                                >
                                    Details
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
