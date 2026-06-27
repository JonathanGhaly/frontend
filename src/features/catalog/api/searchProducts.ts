import type {
    ProductSearchRequest,
} from "../types";
import { getProducts } from "./getProducts";

export const searchProducts = async (
    request: ProductSearchRequest
) => getProducts(request);
