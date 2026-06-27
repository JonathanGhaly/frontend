import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";
import CategorySidebar from "../components/CategorySidebar";
import { useCategories } from "../hooks/useCategories";

const CatalogPage = () => {
    const { data } =
        useProducts();
    const { data: categories = [] } =
        useCategories();

    return (
        <div>
            <h1>Catalog</h1>
            <CategorySidebar categories={categories} />
            <ProductGrid
                products={data?.items ?? []}
            />
        </div>
    );
};

export default CatalogPage;
