import { useQuery } from "@tanstack/react-query";
import api from "../../../config/axios";
import type { AdminOrder } from "../../admin/types";

export const getMyOrders = async () => {
    const response = await api.get<AdminOrder[] | { items: AdminOrder[] }>(
        "/api/v1/Orders"
    );

    return Array.isArray(response.data)
        ? response.data
        : response.data.items || [];
};

export const useUserOrders = () =>
    useQuery({
        queryKey: ["user", "orders"],
        queryFn: getMyOrders,
    });
