import { useState } from "react";

export function useLocalStorage<T>(
    key: string,
    initialValue: T
) {
    const [value, setValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);

            return item
                ? (JSON.parse(item) as T)
                : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setStoredValue = (
        newValue: T | ((value: T) => T)
    ) => {
        try {
            const valueToStore =
                newValue instanceof Function
                    ? newValue(value)
                    : newValue;

            setValue(valueToStore);

            localStorage.setItem(
                key,
                JSON.stringify(valueToStore)
            );
        } catch (error) {
            console.error(error);
        }
    };

    const remove = () => {
        localStorage.removeItem(key);
        setValue(initialValue);
    };

    return {
        value,
        setValue: setStoredValue,
        remove,
    };
}