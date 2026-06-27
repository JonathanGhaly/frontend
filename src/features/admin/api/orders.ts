import api from "../../../config/axios";
import type {
    AdminOrder,
    OrderStatus,
} from "../types";

export const getOrders = async () => {
    const response = await api.get<AdminOrder[] | { items: AdminOrder[] }>(
        "/api/v1/Orders"
    );

    return Array.isArray(response.data)
        ? response.data
        : response.data.items;
};

export const getOrder = async (id: string) => {
    const response = await api.get<AdminOrder>(
        `/api/v1/Orders/${id}`
    );

    return response.data;
};

export const updateOrderStatus = async ({
    id,
    status,
}: {
    id: string;
    status: OrderStatus;
}) => {
    const response = await api.put<AdminOrder>(
        `/api/v1/Orders/${id}/status`,
        { status }
    );

    return response.data;
};
