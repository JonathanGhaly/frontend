import { useState } from "react";
import { Link } from "react-router-dom";
import CategoryForm from "../components/CategoryForm";
import { useCategories } from "../../catalog/hooks/useCategories";
import {
    useCreateCategory,
    useDeleteCategory,
    useUpdateCategory,
} from "../hooks/useAdminCategories";
import type {
    AdminCategory,
    CategoryWriteRequest,
} from "../types";
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";

export default function AdminCategoriesPage() {
    const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const { data: categories = [], isLoading } = useCategories();
    const createCategory = useCreateCategory();
    const updateCategory = useUpdateCategory();
    const deleteCategory = useDeleteCategory();

    const handleSubmit = (request: CategoryWriteRequest) => {
        if (editingCategory) {
            updateCategory.mutate(request, {
                onSuccess: () => setEditingCategory(null),
            });
            return;
        }

        createCategory.mutate(request, {
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
                            Categories Management
                        </h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                            Admin Catalog Console
                        </p>
                    </div>
                </div>

                {!isCreating && !editingCategory && (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-indigo-650 hover:bg-indigo-750 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Create Category</span>
                    </button>
                )}
            </div>

            {/* Form */}
            {(isCreating || editingCategory) && (
                <div className="bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-8 max-w-md shadow-md animate-fade-in">
                    <h2 className="font-extrabold text-sm text-slate-950 uppercase tracking-widest font-display pb-3 mb-6 border-b border-slate-100">
                        {editingCategory ? "Modify Category Details" : "Create New Category"}
                    </h2>
                    <CategoryForm
                        category={editingCategory}
                        onSubmit={handleSubmit}
                        onCancel={() => {
                            setEditingCategory(null);
                            setIsCreating(false);
                        }}
                        loading={createCategory.isPending || updateCategory.isPending}
                    />
                </div>
            )}

            {/* List */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : categories.length === 0 ? (
                <div className="bg-white border border-slate-200 rounded-[2rem] p-10 text-center max-w-md mx-auto">
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-wider">No categories available.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categories.map((category) => (
                        <article
                            key={category.id}
                            className="bg-white border border-slate-200 rounded-[2rem] p-6 flex flex-col justify-between shadow-xs hover:shadow-sm transition-all"
                        >
                            <div>
                                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight font-display">
                                    {category.name || "Unnamed"}
                                </h2>
                                <p className="text-xs text-slate-450 font-bold font-mono uppercase tracking-widest mt-1">
                                    Sort order: {category.sortOrder ?? 0}
                                </p>
                            </div>

                            <div className="flex space-x-2 mt-5 pt-3 border-t border-slate-100/60 justify-end">
                                <button
                                    onClick={() => setEditingCategory(category as any)}
                                    className="p-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-500 hover:text-indigo-650 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => deleteCategory.mutate(category.id)}
                                    className="p-2 bg-slate-50 hover:bg-rose-50 border border-slate-200 text-slate-500 hover:text-rose-600 rounded-lg transition-colors"
                                    title="Delete"
                                    disabled={deleteCategory.isPending}
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
