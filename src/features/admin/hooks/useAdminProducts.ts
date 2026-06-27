import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createProduct,
    deleteProduct,
    updateProduct,
} from "../api/products";

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
};
