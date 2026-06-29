import { useState, type FormEvent } from "react";
import { useCategories } from "../../catalog/hooks/useCategories";
import type {
    AdminProduct,
    ProductWriteRequest,
} from "../types";

interface Props {
    product?: AdminProduct | null;
    loading?: boolean;
    onSubmit: (request: ProductWriteRequest) => void;
    onCancel?: () => void;
}

interface FormErrors {
    name?: string;
    price?: string;
    stockQuantity?: string;
}

const emptyProduct: ProductWriteRequest = {
    name: "",
    slug: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    categoryIds: [],
    isActive: true,
    sku: "",
    currency: "EGP",
    metadata: {},
};

export default function ProductForm({
    product,
    loading,
    onSubmit,
    onCancel,
}: Props) {
    const initialProduct = product
        ? {
              id: product.id,
              name: product.name ?? "",
              slug: product.slug ?? "",
              description: product.description ?? "",
              price: product.price,
              stockQuantity: product.stockQuantity ?? 0,
              categoryIds: product.categoryIds ?? [],
              isActive: product.isActive ?? true,
              sku: product.sku ?? "",
              currency: product.currency ?? "EGP",
              metadata: product.metadata ?? {},
          }
        : emptyProduct;

    const [form, setForm] = useState<ProductWriteRequest>(initialProduct);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
        initialProduct.categoryIds
    );

    // Extract sizes & colors from metadata object
    const initialSizes = Array.isArray(initialProduct.metadata?.sizes)
        ? initialProduct.metadata.sizes.map(String)
        : typeof initialProduct.metadata?.size === 'string'
            ? [initialProduct.metadata.size]
            : [];

    const initialColors = Array.isArray(initialProduct.metadata?.colors)
        ? initialProduct.metadata.colors.map(String)
        : typeof initialProduct.metadata?.color === 'string'
            ? [initialProduct.metadata.color]
            : [];

    const [selectedSizes, setSelectedSizes] = useState<string[]>(initialSizes);
    const [colorInput, setColorInput] = useState<string>(initialColors.join(", "));

    const [errors, setErrors] = useState<FormErrors>({});
    const { data: categories = [] } = useCategories();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors: FormErrors = {};
        if (!form.name.trim()) {
            nextErrors.name = "Product name is required.";
        }
        if (Number(form.price) <= 0) {
            nextErrors.price = "Price must be greater than zero.";
        }
        if (Number(form.stockQuantity) < 0) {
            nextErrors.stockQuantity = "Stock cannot be negative.";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        const colors = colorInput
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);

        setErrors({});
        onSubmit({
            ...form,
            name: form.name.trim(),
            slug: form.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            description: form.description?.trim() || "",
            // Automatically convert dollar input (e.g. 12.2) to cents/piasters
            price: Math.round(Number(form.price) * 100),
            stockQuantity: Number(form.stockQuantity),
            sku: form.sku?.trim() || undefined,
            currency: form.currency?.trim() || "EGP",
            isActive: !!form.isActive,
            metadata: {
                sizes: selectedSizes,
                colors: colors,
            },
            categoryIds: selectedCategoryIds,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                    Product Name
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
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={2}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-850 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        Price ($)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        required
                        value={form.price}
                        onChange={(e) => {
                            setForm({ ...form, price: Number(e.target.value) });
                            setErrors((curr) => ({ ...curr, price: undefined }));
                        }}
                        className={`w-full bg-slate-50 border ${
                            errors.price ? "border-rose-500" : "border-slate-200"
                        } rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    />
                    {errors.price && (
                        <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">
                            {errors.price}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        Stock Quantity
                    </label>
                    <input
                        type="number"
                        min="0"
                        required
                        value={form.stockQuantity}
                        onChange={(e) => {
                            setForm({ ...form, stockQuantity: Number(e.target.value) });
                            setErrors((curr) => ({ ...curr, stockQuantity: undefined }));
                        }}
                        className={`w-full bg-slate-50 border ${
                            errors.stockQuantity ? "border-rose-500" : "border-slate-200"
                        } rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
                    />
                    {errors.stockQuantity && (
                        <p className="mt-1 ml-1 text-[10px] font-bold text-rose-500 tracking-wide uppercase">
                            {errors.stockQuantity}
                        </p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        SKU
                    </label>
                    <input
                        type="text"
                        value={form.sku || ""}
                        onChange={(e) => setForm({ ...form, sku: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="e.g. ACC-001"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                        Currency
                    </label>
                    <input
                        type="text"
                        value={form.currency || ""}
                        onChange={(e) => setForm({ ...form, currency: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        placeholder="EGP"
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                    Categories
                </label>
                <select
                    multiple
                    value={selectedCategoryIds}
                    onChange={(e) => {
                        const values = Array.from(e.target.selectedOptions, (opt) => opt.value);
                        setSelectedCategoryIds(values);
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                    size={4}
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id} className="font-bold text-xs p-1">
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Metadata specifications selection panel */}
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-[1.5rem] space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">
                    Product Specifications
                </h4>

                <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">
                        Select Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => {
                            const isChecked = selectedSizes.includes(size);
                            return (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => {
                                        if (isChecked) {
                                            setSelectedSizes(selectedSizes.filter(s => s !== size));
                                        } else {
                                            setSelectedSizes([...selectedSizes, size]);
                                        }
                                    }}
                                    className={`text-[10px] font-bold px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                                        isChecked
                                            ? 'border-indigo-650 bg-indigo-50 text-indigo-700 font-extrabold'
                                            : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    {size}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">
                        Aesthetic Colors (comma separated)
                    </label>
                    <input
                        type="text"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        placeholder="e.g. Midnight Black, Architectural Gray, Sandstone"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2.5 py-1 pl-1">
                <input
                    type="checkbox"
                    id="isActive"
                    checked={!!form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 text-indigo-650 border-slate-350 rounded focus:ring-indigo-500"
                />
                <label htmlFor="isActive" className="text-xs font-bold text-slate-700 uppercase tracking-wider cursor-pointer">
                    Is Active / Visible
                </label>
            </div>

            <div className="flex space-x-2.5 pt-3">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-indigo-650 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
                >
                    {loading ? "Saving..." : product ? "Update Product" : "Create Product"}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}
