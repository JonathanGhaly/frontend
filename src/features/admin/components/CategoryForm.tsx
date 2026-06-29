import { useState, type FormEvent } from "react";
import { useCategories } from "../../catalog/hooks/useCategories";
import type {
    AdminCategory,
    CategoryWriteRequest,
} from "../types";

interface Props {
    category?: AdminCategory | null;
    loading?: boolean;
    onSubmit: (request: CategoryWriteRequest) => void;
    onCancel?: () => void;
}

interface FormErrors {
    name?: string;
    sortOrder?: string;
}

const emptyCategory: CategoryWriteRequest = {
    name: "",
    slug: "",
    description: "",
    parentId: null,
    sortOrder: 0,
};

export default function CategoryForm({
    category,
    loading,
    onSubmit,
    onCancel,
}: Props) {
    const initialCategory = category
        ? {
              id: category.id,
              name: category.name ?? "",
              slug: category.slug ?? "",
              description: category.description ?? "",
              parentId: category.parentId ?? null,
              sortOrder: category.sortOrder ?? 0,
          }
        : emptyCategory;

    const [form, setForm] = useState<any>(initialCategory);
    const [errors, setErrors] = useState<FormErrors>({});
    const { data: categories = [] } = useCategories();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors: FormErrors = {};
        if (!form.name.trim()) {
            nextErrors.name = "Category name is required.";
        }
        if (form.sortOrder < 0) {
            nextErrors.sortOrder = "Sort order cannot be negative.";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setErrors({});
        onSubmit({
            ...form,
            name: form.name.trim(),
            slug: form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            description: form.description?.trim() || "",
            parentId: form.parentId || null,
            sortOrder: Number(form.sortOrder),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                    Category Name
                </label>
                <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        setErrors((curr) => ({ ...curr, name: undefined }));
                    }}
                    className={`w-full bg-slate-50 border ${
                        errors.name ? "border-rose-500" : "border-slate-200"
                    } rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                />
                {errors.name && (
                    <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">
                        {errors.name}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                    Description
                </label>
                <textarea
                    value={form.description || ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                    Parent Category
                </label>
                <select
                    value={form.parentId || ""}
                    onChange={(e) => setForm({ ...form, parentId: e.target.value || null })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                >
                    <option value="">None</option>
                    {categories
                        .filter((item) => item.id !== category?.id)
                        .map((item) => (
                            <option key={item.id} value={item.id} className="font-bold">
                                {item.name}
                            </option>
                        ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                    Sort Order
                </label>
                <input
                    type="number"
                    min="0"
                    value={form.sortOrder}
                    onChange={(e) => {
                        setForm({ ...form, sortOrder: Number(e.target.value) });
                        setErrors((curr) => ({ ...curr, sortOrder: undefined }));
                    }}
                    className={`w-full bg-slate-50 border ${
                        errors.sortOrder ? "border-rose-500" : "border-slate-200"
                    } rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                />
                {errors.sortOrder && (
                    <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">
                        {errors.sortOrder}
                    </p>
                )}
            </div>

            <div className="flex space-x-2.5 pt-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-indigo-650 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                    {loading ? "Saving..." : category ? "Update Category" : "Create Category"}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
