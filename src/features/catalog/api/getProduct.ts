import api from "../../../config/axios";
import type { Product } from "../types";

export const getProduct = async (
    slugOrId: string
) => {
    const response =
        await api.get<Product>(
            `/api/v1/Products/${slugOrId}`
        );

    return response.data;
};
