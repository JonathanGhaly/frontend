export interface JwtPayload {
    sub: string;
    email?: string;
    role?: string | string[];
    exp: number;
    iat: number;
    [key: string]: unknown;
}

export function decodeJwt(token: string): JwtPayload | null {
    try {
        const payload = token.split(".")[1];

        const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));

        return JSON.parse(json);
    } catch {
        return null;
    }
}

export function isTokenExpired(token: string): boolean {
    const payload = decodeJwt(token);

    if (!payload) return true;

    return payload.exp * 1000 < Date.now();
}

export function getUserId(token: string): string | null {
    return decodeJwt(token)?.sub ?? null;
}

export function getUserRole(token: string): string | string[] | null {
    return decodeJwt(token)?.role ?? null;
}