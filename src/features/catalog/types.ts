export interface Category {
    id: string;
    name: string | null;
    slug?: string | null;
    description?: string | null;
    parentId?: string | null;
    sortOrder?: number;
}

export interface Product {
    id: string;
    name: string | null;
    slug?: string | null;

    description: string | null;

    price: number;

    imageUrl?: string | null;

    stock?: number;

    stockQuantity?: number;

    categoryId?: string;

    categoryIds?: string[];

    createdAt?: string;
}

export interface ProductSearchRequest {
    search?: string;

    categoryId?: string;

    page?: number;

    limit?: number;

    sort?: string;
}

export interface ProductSearchResponse {
    items: Product[];

    page: number;

    pageSize: number;

    totalCount: number;

    totalPages?: number;
}
