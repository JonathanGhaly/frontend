import axios, { type AxiosRequestConfig } from "axios";
import env from "./env";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
    baseURL: env.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    let token = useAuthStore.getState().accessToken;

    if (!token && typeof window !== "undefined") {
        try {
            const storedValue = window.localStorage.getItem("shopiy-auth");
            if (storedValue) {
                const parsed = JSON.parse(storedValue) as {
                    accessToken?: string | null;
                };
                token = parsed.accessToken ?? null;
            }
        } catch {
            token = null;
        }
    }

    if (token) {
        config.headers = config.headers ?? {};
        const authToken = token.startsWith("Bearer ")
            ? token
            : `Bearer ${token}`;

        config.headers.Authorization = authToken;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;
            useAuthStore.getState().logout();

            if (typeof window !== "undefined") {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export { api };
export default api;
