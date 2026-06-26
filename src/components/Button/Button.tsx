import styles from "./Button.module.css";
import type { ButtonProps } from "./Button.types";

export default function Button({
    children,
    loading,
    fullWidth,
    variant = "primary",
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            className={`${styles.button}
            ${styles[variant]}
            ${fullWidth ? styles.full : ""}`}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}