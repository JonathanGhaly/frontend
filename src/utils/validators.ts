export const validators = {
    required(value: string): boolean {
        return value.trim().length > 0;
    },

    email(value: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },

    phone(value: string): boolean {
        return /^\+?[0-9]{8,15}$/.test(value);
    },

    password(value: string): boolean {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
    },

    minLength(value: string, length: number): boolean {
        return value.length >= length;
    },

    maxLength(value: string, length: number): boolean {
        return value.length <= length;
    },

    numeric(value: string): boolean {
        return !isNaN(Number(value));
    },

    positive(value: number): boolean {
        return value > 0;
    },

    url(value: string): boolean {
        try {
            new URL(value);
            return true;
        } catch {
            return false;
        }
    },

    guid(value: string): boolean {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            value
        );
    },
};

export default validators;