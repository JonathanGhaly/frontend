import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
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
    description: "",
    parentId: null,
    sortOrder: 0,
};

const CategoryForm = ({
    category,
    loading,
    onSubmit,
    onCancel,
}: Props) => {
    const initialCategory = category
        ? {
              id: category.id,
              name: category.name ?? "",
              description: category.description ?? "",
              parentId: category.parentId ?? null,
              sortOrder: category.sortOrder ?? 0,
          }
        : emptyCategory;

    const [form, setForm] = useState<CategoryWriteRequest>(initialCategory);
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
            description: form.description.trim(),
            parentId: form.parentId?.trim() || null,
            sortOrder: Number(form.sortOrder),
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

            <div>
                <label htmlFor="parentId">Parent category</label>
                <select
                    id="parentId"
                    name="parentId"
                    value={form.parentId ?? ""}
                    onChange={(event) =>
                        setForm({
                            ...form,
                            parentId: event.target.value || null,
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "0.8rem 0.9rem",
                        borderRadius: "12px",
                        border: "1px solid #cbd5e1",
                        backgroundColor: "white",
                    }}
                >
                    <option value="">None</option>
                    {categories
                        .filter((item) => item.id !== category?.id)
                        .map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name ?? "Unnamed category"}
                            </option>
                        ))}
                </select>
            </div>

            <Input
                label="Sort order"
                type="number"
                min="0"
                name="sortOrder"
                value={form.sortOrder}
                onChange={(event) => {
                    setForm({
                        ...form,
                        sortOrder: Number(event.target.value),
                    });
                    setErrors((current) => ({ ...current, sortOrder: undefined }));
                }}
                error={errors.sortOrder}
            />

            <Button type="submit" loading={loading}>
                {category ? "Update category" : "Create category"}
            </Button>

            {onCancel && (
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            )}
        </form>
    );
};

export default CategoryForm;
