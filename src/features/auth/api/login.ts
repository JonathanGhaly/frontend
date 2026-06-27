import api from "../../../config/axios";
import type { AuthResponse, LoginRequest } from "../types";

export const login = async (request: LoginRequest) => {
    const response = await api.post<AuthResponse>(
        "/api/v1/auth/login",
        request
    );

    return response.data;
};
