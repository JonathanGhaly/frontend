import { useState } from "react";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../../catalog/hooks/useProducts";
import {
    useCreateProduct,
    useDeleteProduct,
    useUpdateProduct,
} from "../hooks/useAdminProducts";
import type {
    AdminProduct,
    ProductWriteRequest,
} from "../types";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
    const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const { data, isLoading, error } = useProducts();
    const createProduct = useCreateProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();
    const products = data?.items ?? [];

    const handleSubmit = (request: ProductWriteRequest) => {
        if (editingProduct) {
            updateProduct.mutate(request, {
                onSuccess: () => setEditingProduct(null),
            });
            return;
        }

        createProduct.mutate(request, {
            onSuccess: () => setIsCreating(false),
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Link to="/admin" className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors">
                        <ArrowLeft className="w-4 h-4" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                            Products Management
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                            Admin Catalog Console
                        </p>
                    </div>
                </div>

                {!isCreating && !editingProduct && (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Product</span>
                    </button>
                )}
            </div>

            {/* Create/Edit Form panel */}
            {(isCreating || editingProduct) && (
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 max-w-xl shadow-md animate-fade-in">
                    <h2 className="font-extrabold text-sm text-slate-950 uppercase tracking-widest font-display pb-3 mb-6 border-b border-slate-100">
                        {editingProduct ? "Modify Product details" : "Add New Product"}
                    </h2>
                    <ProductForm
                        product={editingProduct}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setEditingProduct(null);
                            setIsCreating(false);
                        }}
                        loading={createProduct.isPending || updateProduct.isPending}
                    />
                </div>
            )}

            {/* Products grid / lists */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : products.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-[2rem] p-10 text-center max-w-md mx-auto">
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">No products available.</p>
                </div>
            ) : (
                <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-xs">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                                <th className="p-4 pl-6">Product Details</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Stock</th>
                                <th className="p-4 pr-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                            {products.map((prod) => (
                                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center space-x-3">
                                            {prod.imageUrl && (
                                                <img
                                                    src={prod.imageUrl}
                                                    alt={prod.name || ""}
                                                    className="w-10 h-10 rounded-lg object-cover border border-slate-100"
                                                />
                                            )}
                                            <div>
                                                <div className="font-extrabold text-slate-900">{prod.name}</div>
                                                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{prod.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 font-mono font-bold text-slate-900">
                                        ${prod.price.toFixed(2)}
                                    </td>
                                    <td className="p-4 font-bold text-slate-600">
                                        {prod.stockQuantity ?? prod.stock ?? 0} units
                                    </td>
                                    <td className="p-4 pr-6 text-right space-x-1.5">
                                        <button
                                            onClick={() => setEditingProduct(prod as any)}
                                            className="p-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-500 hover:text-indigo-650 rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => deleteProduct.mutate(prod.id)}
                                            className="p-2 bg-slate-50 hover:bg-rose-50 border border-slate-200 text-slate-500 hover:text-rose-600 rounded-lg transition-colors"
                                            title="Delete"
                                            disabled={deleteProduct.isPending}
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
