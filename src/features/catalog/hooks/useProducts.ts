import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/getProducts";
import type { ProductSearchRequest } from "../types";

export const useProducts = (
    request: ProductSearchRequest = {}
) =>
    useQuery({
        queryKey: ["products", request],

        queryFn: () => getProducts(request),
    });
