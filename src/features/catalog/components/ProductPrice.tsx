import { formatPrice } from "../utils/formatPrice";

interface Props {
    price: number | string | null | undefined;
}

const ProductPrice = ({ price }: Props) => {
    return <strong>{formatPrice(price)}</strong>;
};

export default ProductPrice;
