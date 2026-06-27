import { useCartStore } from "../../../store/cartStore";
import type { Cart } from "../types";

export interface UpdateCartRequest {
    productId: string;

    quantity: number;
}

export const updateCart = async (
    request: UpdateCartRequest
) => {
    const store = useCartStore.getState();
    const existing = store.items.find(
        (item) => item.productId === request.productId
    );

    if (existing) {
        if (request.quantity <= 0) {
            store.removeItem(request.productId);
        } else if (request.quantity > existing.quantity) {
            store.addItem({
                ...existing,
                quantity: request.quantity - existing.quantity,
            });
        } else {
            for (
                let quantity = existing.quantity;
                quantity > request.quantity;
                quantity -= 1
            ) {
                useCartStore
                    .getState()
                    .decreaseQuantity(request.productId);
            }
        }
    }

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
