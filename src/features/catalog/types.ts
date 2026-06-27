export interface Category {
    id: string;
    name: string;
    slug: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;

    description: string;

    price: number;

    imageUrl: string;

    stock: number;

    categoryId: string;

    createdAt: string;
}

export interface ProductSearchRequest {
    search?: string;

    categoryId?: string;

    page: number;

    pageSize: number;
}

export interface ProductSearchResponse {
    items: Product[];

    page: number;

    pageSize: number;

    totalCount: number;
}