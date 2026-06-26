export const storage = {
    get<T>(key: string): T | null {
        try {
            const value = localStorage.getItem(key);

            if (!value) return null;

            return JSON.parse(value) as T;
        } catch {
            return null;
        }
    },

    set<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    },

    remove(key: string): void {
        localStorage.removeItem(key);
    },

    clear(): void {
        localStorage.clear();
    },

    has(key: string): boolean {
        return localStorage.getItem(key) !== null;
    },
};

export default storage;