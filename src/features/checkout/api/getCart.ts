import { useCartStore } from "../../../store/cartStore";
import type { Cart } from "../types";

export const getCart = async () => {
    const items = useCartStore.getState().items;
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return {
        items: items.map((item) => ({
            productId: item.productId,
            productName: item.name,
            imageUrl: item.image ?? "/favicon.svg",
            unitPrice: item.price,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
        })),
        subtotal,
        discount: 0,
        shipping: 0,
        total: subtotal,
    } satisfies Cart;
};
