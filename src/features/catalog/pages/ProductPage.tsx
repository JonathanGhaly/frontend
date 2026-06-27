import { useParams } from "react-router-dom";

import { useProduct } from "../hooks/useProduct";
import ProductDetails from "../components/ProductDetails";

const ProductPage = () => {
    const { id = "" } =
        useParams();

    const { data } =
        useProduct(id);

    if (!data)
        return <p>Loading...</p>;

    return (
        <ProductDetails
            product={data}
        />
    );
};

export default ProductPage;