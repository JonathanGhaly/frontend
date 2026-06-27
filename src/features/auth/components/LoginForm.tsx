import { useState } from "react";
import type { FormEvent } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { useLogin } from "../hooks/useLogin";
import styles from "./AuthForm.module.css";

interface FormErrors {
    email?: string;
    password?: string;
}

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const { mutate, isPending, error } = useLogin();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors: FormErrors = {};
        if (!email.trim()) {
            nextErrors.email = "Email is required.";
        }
        if (!password.trim()) {
            nextErrors.password = "Password is required.";
        }

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        setErrors({});
        mutate({ email: email.trim(), password });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
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
                autoComplete="current-password"
                value={password}
                onChange={(event) => {
                    setPassword(event.target.value);
                    setErrors((current) => ({ ...current, password: undefined }));
                }}
                error={errors.password}
                required
            />

            {error && <p className={styles.feedback}>Unable to log in with those credentials.</p>}

            <Button type="submit" loading={isPending} fullWidth>
                Log in
            </Button>
        </form>
    );
};

export default LoginForm;
