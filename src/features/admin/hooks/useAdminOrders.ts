import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    getOrder,
    getOrders,
    updateOrderStatus,
} from "../api/orders";

export const useAdminOrders = () =>
    useQuery({
        queryKey: ["admin", "orders"],
        queryFn: getOrders,
    });

export const useAdminOrder = (id: string) =>
    useQuery({
        queryKey: ["admin", "orders", id],
        queryFn: () => getOrder(id),
        enabled: !!id,
    });

export const useUpdateOrderStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateOrderStatus,
        onSuccess: (_, variables) => {
            void queryClient.invalidateQueries({
                queryKey: ["admin", "orders"],
            });
            void queryClient.invalidateQueries({
                queryKey: ["admin", "orders", variables.id],
            });
        },
    });
};
