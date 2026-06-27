import Card from "../../../components/Card/Card";
import ProductPrice from "./ProductPrice";

import type { Product } from "../types";
import { useCartStore } from "../../../store/cartStore";
import Button from "../../../components/Button/Button";

interface Props {
    product: Product;
}

const ProductCard = ({
    product,
}: Props) => {
    const addItem = useCartStore((state) => state.addItem);
    const imageUrl =
        product.imageUrl ?? "/favicon.svg";
    const productName =
        product.name ?? "Untitled product";

    return (
        <Card>
            <img
                src={imageUrl}
                alt={productName}
            />

            <h3>{productName}</h3>

            <p>{product.description}</p>

            <ProductPrice
                price={product.price}
            />

            <Button
                type="button"
                onClick={() =>
                    addItem({
                        productId: product.id,
                        name: productName,
                        image: imageUrl,
                        price: product.price,
                        quantity: 1,
                    })
                }
            >
                Add to cart
            </Button>
        </Card>
    );
};

export default ProductCard;
