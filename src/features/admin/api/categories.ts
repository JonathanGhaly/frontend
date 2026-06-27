import api from "../../../config/axios";
import type {
    AdminCategory,
    CategoryWriteRequest,
} from "../types";

export const createCategory = async (
    request: CategoryWriteRequest
) => {
    const response = await api.post<AdminCategory>(
        "/api/v1/Categories",
        request
    );

    return response.data;
};

export const updateCategory = async (
    request: CategoryWriteRequest
) => {
    const response = await api.put<AdminCategory>(
        `/api/v1/Categories/${request.id}`,
        request
    );

    return response.data;
};

export const deleteCategory = async (id: string) => {
    await api.delete(`/api/v1/Categories/${id}`);
};
