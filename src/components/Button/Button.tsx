import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

export default function Button({
    children,
    loading,
    fullWidth,
    variant = "primary",
    type = "button",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            type={type}
            className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.full : ""}`.trim()}
            aria-busy={loading}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}