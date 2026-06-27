import api from "../../../config/axios";

import type {
    CreateOrderRequest,
    OrderResponse,
} from "../types";

export const createOrder = async (
    request: CreateOrderRequest
) => {
    const response =
        await api.post<OrderResponse>(
            "/api/v1/Orders",
            request
        );

    return response.data;
};
