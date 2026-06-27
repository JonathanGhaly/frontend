import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";

const CatalogPage = () => {
    const { data } =
        useProducts();

    return (
        <ProductGrid
            products={data?.items ?? []}
        />
    );
};

export default CatalogPage;