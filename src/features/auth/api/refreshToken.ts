import api from "../../../config/axios";
import type { AuthResponse } from "../types";

export const refreshToken = async () => {
    const response = await api.post<AuthResponse>(
        "/api/v1/auth/refresh"
    );

    return response.data;
};
