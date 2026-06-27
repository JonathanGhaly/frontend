import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/createOrder";
import { useCartStore } from "../../../store/cartStore";

export const useCreateOrder = () => {
    const navigate = useNavigate();
    const clearCart = useCartStore((state) => state.clear);

    return useMutation({
        mutationFn: createOrder,
        onSuccess: () => {
            clearCart();
            navigate("/checkout/success");
        },
    });
};
