import ProductPrice from "./ProductPrice";
import type { Product } from "../types";
import Button from "../../../components/Button/Button";
import { useCartStore } from "../../../store/cartStore";

interface Props {
    product: Product;
}

const ProductDetails = ({
    product,
}: Props) => {
    const addItem = useCartStore((state) => state.addItem);
    const imageUrl = product.imageUrl ?? "/favicon.svg";
    const productName = product.name ?? "Untitled product";
    const stock = product.stockQuantity ?? product.stock ?? 0;
    const description = product.description ?? "No description available.";
    const price = Number(product.price ?? 0);

    return (
        <div>
            <img src={imageUrl} alt={productName} />

            <h1>{productName}</h1>

            <p>{description}</p>

            <ProductPrice price={price} />

            <p>Stock: {stock}</p>

            <Button
                type="button"
                onClick={() =>
                    addItem({
                        productId: product.id,
                        name: productName,
                        image: imageUrl,
                        price: Number.isFinite(price) ? price : 0,
                        quantity: 1,
                    })
                }
            >
                Add to cart
            </Button>
        </div>
    );
};

export default ProductDetails;
