export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export interface ApiError {
    success: boolean;
    message: string;
    errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
    items: T[];
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiresAt: string;
}

export interface RefreshTokenRequest {
    accessToken: string;
    refreshToken: string;
}