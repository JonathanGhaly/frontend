import api from "../../../config/axios";
import type {
    Product,
    ProductSearchRequest,
    ProductSearchResponse,
} from "../types";

interface ProductsApiResponse {
    data?: Product[];
    items?: Product[];
    meta?: {
        totalItems?: number;
        currentPage?: number;
        totalPages?: number;
    };
}

export const getProducts = async (
    request: ProductSearchRequest = {}
) => {
    const response =
        await api.get<
            ProductSearchResponse | Product[] | ProductsApiResponse
        >(
            "/api/v1/Products",
            {
                params: {
                    page: request.page ?? 1,
                    limit: request.limit ?? 20,
                    sort: request.sort,
                    categoryId: request.categoryId,
                    search: request.search,
                },
            }
        );

    const payload = response.data;

    if (Array.isArray(payload)) {
        return {
            items: payload,
            page: request.page ?? 1,
            pageSize: request.limit ?? payload.length,
            totalCount: payload.length,
        };
    }

    if (payload && typeof payload === "object") {
        const typedPayload = payload as ProductsApiResponse;
        const items = Array.isArray(typedPayload.items)
            ? typedPayload.items
            : Array.isArray(typedPayload.data)
              ? typedPayload.data
              : [];

        return {
            items,
            page: typedPayload.meta?.currentPage ?? request.page ?? 1,
            pageSize: request.limit ?? items.length,
            totalCount: typedPayload.meta?.totalItems ?? items.length,
            totalPages: typedPayload.meta?.totalPages,
        };
    }

    return {
        items: [],
        page: request.page ?? 1,
        pageSize: request.limit ?? 0,
        totalCount: 0,
    };
};
