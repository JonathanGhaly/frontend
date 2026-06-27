import api from "../../../config/axios";
import type {
    AdminProduct,
    ProductWriteRequest,
} from "../types";

export const createProduct = async (
    request: ProductWriteRequest
) => {
    const response = await api.post<AdminProduct>(
        "/api/v1/Products",
        request
    );

    return response.data;
};

export const updateProduct = async (
    request: ProductWriteRequest
) => {
    const response = await api.put<AdminProduct>(
        `/api/v1/Products/${request.id}`,
        request
    );

    return response.data;
};

export const deleteProduct = async (id: string) => {
    await api.delete(`/api/v1/Products/${id}`);
};
