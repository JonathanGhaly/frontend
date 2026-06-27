import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";
import styles from "../../../components/FormCard.module.css";

const RegisterPage = () => {
    return (
        <main style={{ padding: "2rem 1rem 3rem", display: "flex", justifyContent: "center" }}>
            <section className={styles.card}>
                <h1 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Create account</h1>
                <p style={{ marginBottom: "1.5rem", color: "#64748b" }}>
                    Start your account in seconds and enjoy a smoother checkout.
                </p>
                <RegisterForm />
                <p style={{ marginTop: "1.25rem", textAlign: "center" }}>
                    Already registered? <Link to="/login">Log in</Link>
                </p>
            </section>
        </main>
    );
};

export default RegisterPage;
