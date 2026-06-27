import { useCartStore } from "../../../store/cartStore";

export const useUpdateCart = () => {
    const increaseQuantity = useCartStore(
        (state) => state.increaseQuantity
    );
    const decreaseQuantity = useCartStore(
        (state) => state.decreaseQuantity
    );
    const removeItem = useCartStore((state) => state.removeItem);

    return {
        increaseQuantity,
        decreaseQuantity,
        removeItem,
    };
};
