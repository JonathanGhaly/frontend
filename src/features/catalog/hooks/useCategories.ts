import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/getCategories";

export const useCategories = () =>
    useQuery({
        queryKey: ["categories"],

        queryFn: getCategories,
    });
