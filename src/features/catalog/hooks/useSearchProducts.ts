import { useQuery } from "@tanstack/react-query";

import { searchProducts } from "../api/searchProducts";
import type { ProductSearchRequest } from "../types";

export const useSearchProducts = (
    request: ProductSearchRequest
) =>
    useQuery({
        queryKey: ["products", request],

        queryFn: () => searchProducts(request),
    });
