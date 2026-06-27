import api from "../../../config/axios";
import { Category } from "../types";

export const getCategories = async () => {
    const response =
        await api.get<Category[]>("/categories");

    return response.data;
};