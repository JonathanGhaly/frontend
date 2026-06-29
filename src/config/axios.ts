import axios, { type AxiosRequestConfig } from "axios";
import env from "./env";
import { useAuthStore } from "../store/authStore";
import { logApiRequest } from "../services/api";

const api = axios.create({
    baseURL: env.API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    // Dynamically retrieve Developer Panel base URL configuration if exists
    try {
        const savedConfig = window.localStorage.getItem("dotnet_api_config");
        if (savedConfig) {
            const parsed = JSON.parse(savedConfig) as {
                baseUrl?: string;
                token?: string;
                useMockFallback?: boolean;
            };
            if (parsed.baseUrl && !parsed.useMockFallback) {
                config.baseURL = parsed.baseUrl.replace(/\/$/, "");
            }
        }
    } catch {
        // Fallback to env.API_URL
    }

    let token = useAuthStore.getState().accessToken;

    if (!token && typeof window !== "undefined") {
        try {
            const storedValue = window.localStorage.getItem("shopiy-auth");
            if (storedValue) {
                const parsed = JSON.parse(storedValue) as any;
                token = parsed.state?.accessToken ?? parsed.accessToken ?? null;
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

    // Log request to Developer Panel console
    logApiRequest(
        (config.method?.toUpperCase() || "GET") as any,
        `${config.baseURL || ""}${config.url || ""}`,
        "request",
        "PENDING",
        config.data
    );

    return config;
});

api.interceptors.response.use(
    (response) => {
        // Log success to Developer Panel console
        logApiRequest(
            (response.config.method?.toUpperCase() || "GET") as any,
            `${response.config.baseURL || ""}${response.config.url || ""}`,
            "success",
            response.status,
            response.data
        );
        return response;
    },
    (error) => {
        const originalRequest = error.config as AxiosRequestConfig & {
            _retry?: boolean;
        };

        // Log failure to Developer Panel console
        logApiRequest(
            (error.config?.method?.toUpperCase() || "GET") as any,
            `${error.config?.baseURL || ""}${error.config?.url || ""}`,
            "error",
            error.response?.status || "FAILED",
            error.response?.data || { error: error.message }
        );

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
