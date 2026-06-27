import { useState } from "react";
import Button from "../../../components/Button/Button";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../../catalog/hooks/useProducts";
import { formatPrice } from "../../catalog/utils/formatPrice";
import {
    useCreateProduct,
    useDeleteProduct,
    useUpdateProduct,
} from "../hooks/useAdminProducts";
import type {
    AdminProduct,
    ProductWriteRequest,
} from "../types";

const AdminProductsPage = () => {
    const [editingProduct, setEditingProduct] =
        useState<AdminProduct | null>(null);
    const { data, isLoading, isError, error } = useProducts();
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

        createProduct.mutate(request);
    };

    return (
        <div style={{ padding: "2rem 1rem 3rem" }}>
            <h1 style={{ marginTop: 0 }}>Products</h1>

            <section style={{ display: "grid", gap: "1rem", maxWidth: "820px", marginBottom: "2rem" }}>
                <div style={{ padding: "1.5rem", borderRadius: "20px", background: "rgba(255,255,255,0.9)", boxShadow: "0 16px 40px rgba(15,23,42,0.08)" }}>
                    <ProductForm
                        key={editingProduct?.id ?? "new-product"}
                        product={editingProduct}
                        onSubmit={handleSubmit}
                        onCancel={() => setEditingProduct(null)}
                        loading={
                            createProduct.isPending ||
                            updateProduct.isPending
                        }
                    />
                </div>
            </section>

            {isLoading && <p>Loading products...</p>}

            {isError && (
                <p>
                    We could not load products. {" "}
                    {error instanceof Error ? error.message : "Please try again."}
                </p>
            )}

            <section style={{ display: "grid", gap: "1rem" }}>
                {!isLoading && products.length === 0 && (
                    <p>No products available yet.</p>
                )}

                {products.map((product: AdminProduct) => (
                    <article key={product.id} style={{ padding: "1.25rem", borderRadius: "18px", background: "rgba(255,255,255,0.9)", boxShadow: "0 12px 30px rgba(15,23,42,0.06)" }}>
                        <h2>{product.name ?? "Untitled product"}</h2>
                        <p>{formatPrice(product.price)}</p>
                        <p style={{ marginTop: "0.5rem", color: "#64748b" }}>
                            Stock: {product.stockQuantity ?? product.stock ?? 0}
                        </p>

                        <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() =>
                                    setEditingProduct(product)
                                }
                            >
                                Edit
                            </Button>

                            <Button
                                type="button"
                                variant="danger"
                                loading={deleteProduct.isPending}
                                onClick={() =>
                                    deleteProduct.mutate(product.id)
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

export default AdminProductsPage;
