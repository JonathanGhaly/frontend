import ProductCard from "./ProductCard";
import { Product } from "../types";

interface Props {
    products: Product[];
}

const ProductGrid = ({
    products,
}: Props) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fill,minmax(260px,1fr))",
                gap: "1rem",
            }}
        >
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
};

export default ProductGrid;