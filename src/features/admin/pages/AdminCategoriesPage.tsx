import { useState } from "react";
import Button from "../../../components/Button/Button";
import { useCategories } from "../../catalog/hooks/useCategories";
import CategoryForm from "../components/CategoryForm";
import {
    useCreateCategory,
    useDeleteCategory,
    useUpdateCategory,
} from "../hooks/useAdminCategories";
import type {
    AdminCategory,
    CategoryWriteRequest,
} from "../types";

const AdminCategoriesPage = () => {
    const [editingCategory, setEditingCategory] =
        useState<AdminCategory | null>(null);
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

        createCategory.mutate(request);
    };

    return (
        <div style={{ padding: "2rem 1rem 3rem" }}>
            <h1 style={{ marginTop: 0 }}>Categories</h1>

            <section style={{ display: "grid", gap: "1rem", maxWidth: "720px", marginBottom: "2rem" }}>
                <div style={{ padding: "1.5rem", borderRadius: "20px", background: "rgba(255,255,255,0.9)", boxShadow: "0 16px 40px rgba(15,23,42,0.08)" }}>
                    <CategoryForm
                        key={editingCategory?.id ?? "new-category"}
                        category={editingCategory}
                        onSubmit={handleSubmit}
                        onCancel={() => setEditingCategory(null)}
                        loading={
                            createCategory.isPending ||
                            updateCategory.isPending
                        }
                    />
                </div>
            </section>

            {isLoading && <p>Loading categories...</p>}

            <section style={{ display: "grid", gap: "1rem" }}>
                {categories.map((category) => (
                    <article key={category.id} style={{ padding: "1.25rem", borderRadius: "18px", background: "rgba(255,255,255,0.9)", boxShadow: "0 12px 30px rgba(15,23,42,0.06)" }}>
                        <h2>{category.name ?? "Untitled category"}</h2>
                        <p>{category.description}</p>
                        <p style={{ marginTop: "0.5rem", color: "#64748b" }}>Sort: {category.sortOrder ?? 0}</p>

                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() =>
                                    setEditingCategory(category)
                                }
                            >
                                Edit
                            </Button>

                            <Button
                                type="button"
                                variant="danger"
                                loading={deleteCategory.isPending}
                                onClick={() =>
                                    deleteCategory.mutate(category.id)
                                }
                            >
                                Delete
                            </Button>
                        </div>
                    </article>
                ))}
            </section>
        </div>
    );
};

export default AdminCategoriesPage;
