import styles from "./Layout.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>
                Shopiy · built for a cleaner, faster shopping experience
            </p>
        </footer>
    );
}
