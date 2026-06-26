export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt?: string | null;
}

export interface SelectOption<T = string> {
    label: string;
    value: T;
}

export interface PaginationParams {
    page: number;
    pageSize: number;
}

export interface PaginationResult<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Dictionary<T> = Record<string, T>;