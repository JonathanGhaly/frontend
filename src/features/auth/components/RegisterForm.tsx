import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { useRegister } from "../hooks/useRegister";
import styles from "./AuthForm.module.css";

interface FormErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

const RegisterForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const { mutate, isPending, error } = useRegister();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors: FormErrors = {};
        if (!fullName.trim()) {
            nextErrors.fullName = "Full name is required.";
        }
        if (!email.trim()) {
            nextErrors.email = "Email is required.";
        }
        if (!password.trim()) {
            nextErrors.password = "Password is required.";
        }
        if (!confirmPassword.trim()) {
            nextErrors.confirmPassword = "Please confirm your password.";
        } else if (confirmPassword !== password) {
            nextErrors.confirmPassword = "Passwords do not match.";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setErrors({});
        mutate({
            fullName: fullName.trim(),
            email: email.trim(),
            password,
            confirmPassword,
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                label="Full name"
                name="fullName"
                autoComplete="name"
                value={fullName}
                onChange={(event) => {
                    setFullName(event.target.value);
                    setErrors((current) => ({ ...current, fullName: undefined }));
                }}
                error={errors.fullName}
                required
            />

            <Input
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value);
                    setErrors((current) => ({ ...current, email: undefined }));
                }}
                error={errors.email}
                required
            />

            <Input
                label="Password"
                type="password"
                name="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors((current) => ({ ...current, password: undefined }));
                }}
                error={errors.password}
                required
            />

            <Input
                label="Confirm password"
                type="password"
                name="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setErrors((current) => ({ ...current, confirmPassword: undefined }));
                }}
                error={errors.confirmPassword}
                required
            />

            {error && <p className={styles.feedback}>Unable to create the account.</p>}

            <Button type="submit" loading={isPending} fullWidth>
                Create account
            </Button>
        </form>
    );
};

export default RegisterForm;
