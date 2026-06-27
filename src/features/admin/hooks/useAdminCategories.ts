import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createCategory,
    deleteCategory,
    updateCategory,
} from "../api/categories";

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });
};

export const useUpdateCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCategory,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });
};

export const useDeleteCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });
};
