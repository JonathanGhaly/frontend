import Button from "../../../components/Button/Button";
import type { CartItem as Item } from "../types";
import { useUpdateCart } from "../hooks/useUpdateCart";

interface Props {
    item: Item;
}

const CartItem = ({ item }: Props) => {
    const {
        increaseQuantity,
        decreaseQuantity,
        removeItem,
    } = useUpdateCart();

    return (
        <div>
            <img
                src={item.imageUrl}
                alt={item.productName}
                width={80}
            />

            <h3>{item.productName}</h3>

            <p>Qty: {item.quantity}</p>

            <p>${item.totalPrice.toFixed(2)}</p>

            <Button
                type="button"
                onClick={() =>
                    decreaseQuantity(item.productId)
                }
            >
                -
            </Button>

            <Button
                type="button"
                onClick={() =>
                    increaseQuantity(item.productId)
                }
            >
                +
            </Button>

            <Button
                type="button"
                variant="danger"
                onClick={() =>
                    removeItem(item.productId)
                }
            >
                Remove
            </Button>
        </div>
    );
};

export default CartItem;
