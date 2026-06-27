import api from "../../../config/axios";
import type { AuthResponse, RegisterRequest } from "../types";

export const register = async (request: RegisterRequest) => {
    const response = await api.post<AuthResponse>(
        "/api/v1/auth/register",
        request
    );

    return response.data;
};
