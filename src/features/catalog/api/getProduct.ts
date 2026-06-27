import api from "../../../config/axios";
import { Product } from "../types";

export const getProduct = async (
    id: string
) => {
    const response =
        await api.get<Product>(`/products/${id}`);

    return response.data;
};