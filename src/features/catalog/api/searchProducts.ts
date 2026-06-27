import api from "../../../config/axios";

import {
    ProductSearchRequest,
    ProductSearchResponse,
} from "../types";

export const searchProducts = async (
    request: ProductSearchRequest
) => {
    const response =
        await api.get<ProductSearchResponse>(
            "/products/search",
            {
                params: request,
            }
        );

    return response.data;
};