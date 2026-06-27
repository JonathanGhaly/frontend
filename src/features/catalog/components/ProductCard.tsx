import Card from "../../../components/Card/Card";
import ProductPrice from "./ProductPrice";

import { Product } from "../types";

interface Props {
    product: Product;
}

const ProductCard = ({
    product,
}: Props) => {
    return (
        <Card>
            <img
                src={product.imageUrl}
                alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <ProductPrice
                price={product.price}
            />
        </Card>
    );
};

export default ProductCard;