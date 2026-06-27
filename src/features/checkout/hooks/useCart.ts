import { useCartStore } from "../../../store/cartStore";
import type { Cart } from "../types";

const SHIPPING_AMOUNT = 0;

export const useCart = (): Cart => {
    const items = useCartStore((state) => state.items);
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const shipping = items.length > 0 ? SHIPPING_AMOUNT : 0;

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
        shipping,
        total: subtotal + shipping,
    };
};
