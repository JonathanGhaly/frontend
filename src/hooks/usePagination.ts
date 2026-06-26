import { useMemo, useState } from "react";

interface PaginationResult<T> {
    currentPage: number;
    totalPages: number;
    pageSize: number;

    data: T[];

    nextPage: () => void;
    previousPage: () => void;
    goToPage: (page: number) => void;

    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export function usePagination<T>(
    items: T[],
    pageSize = 10
): PaginationResult<T> {
    const [currentPage, setCurrentPage] =
        useState(1);

    const totalPages = Math.max(
        1,
        Math.ceil(items.length / pageSize)
    );

    const data = useMemo(() => {
        const start = (currentPage - 1) * pageSize;

        return items.slice(start, start + pageSize);
    }, [items, currentPage, pageSize]);

    const goToPage = (page: number) => {
        if (page < 1) page = 1;

        if (page > totalPages)
            page = totalPages;

        setCurrentPage(page);
    };

    const nextPage = () => {
        goToPage(currentPage + 1);
    };

    const previousPage = () => {
        goToPage(currentPage - 1);
    };

    return {
        currentPage,
        totalPages,
        pageSize,

        data,

        nextPage,
        previousPage,
        goToPage,

        hasNextPage:
            currentPage < totalPages,

        hasPreviousPage:
            currentPage > 1,
    };
}