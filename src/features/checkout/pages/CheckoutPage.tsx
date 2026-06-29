import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { MapPin, Globe, CreditCard, ChevronLeft } from "lucide-react";

export default function CheckoutPage() {
    const cart = useCart();
    const { mutate, isPending, error } = useCreateOrder();
    const [idempotencyKey] = useState(() => crypto.randomUUID());

    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("United States");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});

    if (cart.items.length === 0) {
        return (
            <div className="max-w-xl mx-auto text-center py-16 px-4">
                <h2 className="text-xl font-bold text-slate-800">Your Cart is Empty</h2>
                <Link to="/" className="text-indigo-650 hover:underline font-bold mt-4 inline-block">
                    Return to Catalog
                </Link>
            </div>
        );
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors: Record<string, string> = {};
        if (!street.trim()) nextErrors.street = "Street is required.";
        if (!city.trim()) nextErrors.city = "City is required.";
        if (!postalCode.trim()) nextErrors.postalCode = "Postal code is required.";

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setErrors({});
        mutate({
            request: {
                items: cart.items.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                })),
                shippingAddress: { street: street.trim(), city: city.trim(), postalCode: postalCode.trim(), country },
                billingAddress: { street: street.trim(), city: city.trim(), postalCode: postalCode.trim(), country },
                notes: notes.trim() || undefined,
            },
            idempotencyKey,
        });
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
            <Link to="/cart" className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-indigo-600 uppercase tracking-wider mb-6">
                <ChevronLeft className="w-4 h-4" />
                <span>Back to Cart</span>
            </Link>

            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display mb-6">
                Secure Checkout
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Shipping & Payment details */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Shipping Address Box */}
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 shadow-xs relative overflow-hidden">
                        <div className="flex items-center space-x-2.5 text-slate-900 mb-6">
                            <MapPin className="w-5 h-5 text-indigo-600" />
                            <h2 className="font-extrabold text-sm uppercase tracking-wider font-display">Shipping Destination</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Street Address</label>
                                <input
                                    type="text"
                                    placeholder="123 Workspace Dr"
                                    value={street}
                                    onChange={(e) => {
                                        setStreet(e.target.value);
                                        setErrors((c) => ({ ...c, street: "" }));
                                    }}
                                    className={`w-full bg-slate-50 border ${
                                        errors.street ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                                    } rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium`}
                                />
                                {errors.street && <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">{errors.street}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">City</label>
                                <input
                                    type="text"
                                    placeholder="San Francisco"
                                    value={city}
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                        setErrors((c) => ({ ...c, city: "" }));
                                    }}
                                    className={`w-full bg-slate-50 border ${
                                        errors.city ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                                    } rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium`}
                                />
                                {errors.city && <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">{errors.city}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Postal Code</label>
                                <input
                                    type="text"
                                    placeholder="94103"
                                    value={postalCode}
                                    onChange={(e) => {
                                        setPostalCode(e.target.value);
                                        setErrors((c) => ({ ...c, postalCode: "" }));
                                    }}
                                    className={`w-full bg-slate-50 border ${
                                        errors.postalCode ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-600"
                                    } rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-4 transition-all text-slate-800 font-medium`}
                                />
                                {errors.postalCode && <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">{errors.postalCode}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Country</label>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-800 font-bold cursor-pointer"
                                >
                                    <option value="United States">United States</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Germany">Germany</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Order Notes */}
                    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 shadow-xs">
                        <div className="flex items-center space-x-2.5 text-slate-900 mb-4">
                            <Globe className="w-5 h-5 text-indigo-600" />
                            <h2 className="font-extrabold text-sm uppercase tracking-wider font-display">Notes or Instructions</h2>
                        </div>
                        <textarea
                            placeholder="Apartment building door codes, delivery specifications, etc."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-800 font-medium"
                        />
                    </div>
                </div>

                {/* Right hand checkout summary */}
                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-6 shadow-xs h-fit space-y-5">
                    <h2 className="font-extrabold text-xs text-slate-950 uppercase tracking-widest font-display pb-3 border-b border-slate-100">
                        Order Review
                    </h2>

                    <div className="space-y-3.5 max-h-48 overflow-y-auto pr-1">
                        {cart.items.map((item) => (
                            <div key={item.productId} className="flex justify-between items-center text-xs">
                                <span className="text-slate-600 font-medium line-clamp-1 flex-1 pr-2">
                                    {item.productName} <strong className="text-slate-900">x{item.quantity}</strong>
                                </span>
                                <span className="font-mono font-bold text-slate-900">${item.totalPrice.toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-100 pt-4 space-y-3 text-xs">
                        <div className="flex justify-between items-center text-slate-500">
                            <span>Subtotal</span>
                            <span className="font-bold font-mono text-slate-800">${cart.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500">
                            <span>Shipping</span>
                            <span className="text-emerald-500 font-bold uppercase tracking-wider text-[10px]">Free</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-slate-100 font-bold text-sm text-slate-900">
                            <span>Total</span>
                            <span className="text-xl font-black font-mono text-indigo-700">${cart.total.toFixed(2)}</span>
                        </div>
                    </div>

                    {error && (
                        <div className="bg-rose-50 border border-rose-100 text-rose-800 text-[10px] font-bold py-2.5 px-3 rounded-xl text-center">
                            Failed to submit order. Verify server status.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer"
                    >
                        {isPending ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <>
                                <CreditCard className="w-4 h-4" />
                                <span>Place Secure Order</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
