import type { LoginResponse, UserDto } from "../../types/api";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type AuthResponse = LoginResponse;
export type User = UserDto;
