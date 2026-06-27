import CartItem from "./CartItem";
import type { CartItem as Item } from "../types";

interface Props {
    items: Item[];
}

const CartList = ({ items }: Props) => {
    return (
        <>
            {items.map((item) => (
                <CartItem
                    key={item.productId}
                    item={item}
                />
            ))}
        </>
    );
};

export default CartList;
