import api from "../../../config/axios";
import type { Category } from "../types";

export const getCategories = async () => {
    const response =
        await api.get<Category[]>("/api/v1/Categories");

    return response.data;
};
