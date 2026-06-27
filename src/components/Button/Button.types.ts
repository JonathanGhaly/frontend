import type { ButtonHTMLAttributes } from "react";

export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    fullWidth?: boolean;
    variant?: "primary" | "secondary" | "danger";
}
