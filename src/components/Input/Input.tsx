import styles from "./Input.module.css";
import type { InputProps } from "./Input.types";

export default function Input({
    label,
    error,
    className,
    id,
    ...props
}: InputProps) {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
        <div className={styles.container}>
            {label && (
                <label className={styles.label} htmlFor={inputId}>
                    {label}
                </label>
            )}

            <input
                {...props}
                id={inputId}
                className={`${styles.input} ${error ? styles.error : ""} ${className ?? ""}`.trim()}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${inputId}-error` : undefined}
            />

            {error && (
                <span id={`${inputId}-error`} className={styles.errorText}>
                    {error}
                </span>
            )}
        </div>
    );
}