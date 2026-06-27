import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
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
    description: "",
    price: 0,
    stockQuantity: 0,
    categoryIds: [],
};

const ProductForm = ({
    product,
    loading,
    onSubmit,
    onCancel,
}: Props) => {
    const initialProduct = product
        ? {
              id: product.id,
              name: product.name ?? "",
              description: product.description ?? "",
              price: product.price,
              stockQuantity: product.stockQuantity ?? product.stock ?? 0,
              categoryIds:
                  product.categoryIds ??
                  (product.categoryId ? [product.categoryId] : []),
          }
        : emptyProduct;

    const [form, setForm] = useState<ProductWriteRequest>(initialProduct);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(
        initialProduct.categoryIds
    );
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

        setErrors({});
        onSubmit({
            ...form,
            name: form.name.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            stockQuantity: Number(form.stockQuantity),
            categoryIds: selectedCategoryIds.filter(Boolean),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                label="Name"
                name="name"
                value={form.name}
                onChange={(event) => {
                    setForm({
                        ...form,
                        name: event.target.value,
                    });
                    setErrors((current) => ({ ...current, name: undefined }));
                }}
                error={errors.name}
                required
            />

            <Input
                label="Description"
                name="description"
                value={form.description}
                onChange={(event) =>
                    setForm({
                        ...form,
                        description: event.target.value,
                    })
                }
            />

            <Input
                label="Price"
                type="number"
                min="0"
                step="0.01"
                name="price"
                value={form.price}
                onChange={(event) => {
                    setForm({
                        ...form,
                        price: Number(event.target.value),
                    });
                    setErrors((current) => ({ ...current, price: undefined }));
                }}
                error={errors.price}
                required
            />

            <Input
                label="Stock"
                type="number"
                min="0"
                name="stockQuantity"
                value={form.stockQuantity}
                onChange={(event) => {
                    setForm({
                        ...form,
                        stockQuantity: Number(event.target.value),
                    });
                    setErrors((current) => ({ ...current, stockQuantity: undefined }));
                }}
                error={errors.stockQuantity}
                required
            />

            <div>
                <label htmlFor="categoryIds">Categories</label>
                <select
                    id="categoryIds"
                    name="categoryIds"
                    multiple
                    value={selectedCategoryIds}
                    size={Math.min(categories.length, 6) || 1}
                    onChange={(event) => {
                        const values = Array.from(
                            event.target.selectedOptions,
                            (option) => option.value
                        );
                        setSelectedCategoryIds(values);
                    }}
                    style={{
                        width: "100%",
                        padding: "0.8rem 0.9rem",
                        borderRadius: "12px",
                        border: "1px solid #cbd5e1",
                        backgroundColor: "white",
                    }}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name ?? "Unnamed category"}
                        </option>
                    ))}
                </select>
            </div>

            <Button type="submit" loading={loading}>
                {product ? "Update product" : "Create product"}
            </Button>

            {onCancel && (
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            )}
        </form>
    );
};

export default ProductForm;
