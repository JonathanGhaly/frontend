import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import styles from "../../../components/FormCard.module.css";

const LoginPage = () => {
    return (
        <main style={{ padding: "2rem 1rem 3rem", display: "flex", justifyContent: "center" }}>
            <section className={styles.card}>
                <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Log in</h1>
                <p style={{ marginBottom: "1.5rem", color: "#64748b" }}>
                    Welcome back. Sign in to continue shopping.
                </p>
                <LoginForm />
                <p style={{ marginTop: "1.25rem", textAlign: "center" }}>
                    Need an account? <Link to="/register">Register</Link>
                </p>
            </section>
        </main>
    );
};

export default LoginPage;
