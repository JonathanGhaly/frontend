import api from "../../../config/axios";
import { ProductSearchResponse } from "../types";

export const getProducts = async () => {
    const response =
        await api.get<ProductSearchResponse>("/products");

    return response.data;
};