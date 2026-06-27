import { useParams } from "react-router-dom";

import { useProduct } from "../hooks/useProduct";
import ProductDetails from "../components/ProductDetails";

const ProductPage = () => {
    const { id = "" } = useParams();
    const { data, isLoading, isError, error } = useProduct(id);

    if (isLoading) {
        return <p>Loading product...</p>;
    }

    if (isError || !data) {
        return (
            <div>
                <h1>Product unavailable</h1>
                <p>{error instanceof Error ? error.message : "We could not load this product."}</p>
            </div>
        );
    }

    return <ProductDetails product={data} />;
};

export default ProductPage;