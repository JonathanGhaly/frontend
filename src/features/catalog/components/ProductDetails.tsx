import ProductPrice from "./ProductPrice";
import { Product } from "../types";

interface Props {
    product: Product;
}

const ProductDetails = ({
    product,
}: Props) => {
    return (
        <>
            <img
                src={product.imageUrl}
                alt={product.name}
            />

            <h1>{product.name}</h1>

            <p>{product.description}</p>

            <ProductPrice
                price={product.price}
            />

            <p>Stock: {product.stock}</p>
        </>
    );
};

export default ProductDetails;