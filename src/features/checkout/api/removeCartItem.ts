import { useCartStore } from "../../../store/cartStore";

export const removeCartItem = async (productId: string) => {
    useCartStore.getState().removeItem(productId);
};
