import api from "../../../config/axios";

import type {
    CreateOrderRequest,
    OrderResponse,
} from "../types";

export const createOrder = async ({
    request,
    idempotencyKey,
}: {
    request: CreateOrderRequest;
    idempotencyKey: string;
}) => {
    const response =
        await api.post<OrderResponse>(
            "/api/v1/Orders",
            request,
            {
                headers: {
                    "X-Idempotency-Key": idempotencyKey,
                },
            }
        );

    return response.data;
};
