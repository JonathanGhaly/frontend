import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../api/getProduct";

export const useProduct = (idOrSlug: string) =>
    useQuery({
        queryKey: ["products", idOrSlug],

        queryFn: () => getProduct(idOrSlug),

        enabled: !!idOrSlug,
    });
