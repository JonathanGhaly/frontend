import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import { useLogout } from "../../features/auth/hooks/useLogout";
import { useUiStore } from "../../store/uiStore";
import styles from "./Layout.module.css";

export default function Navbar() {
    const logout = useLogout();
    const totalItems = useCartStore((state) => state.totalItems());
    const toggleSidebar = useUiStore((state) => state.toggleSidebar);

    return (
        <header className={styles.header}>
            <div className={styles.brand}>
                <button
                    type="button"
                    className={styles.menuButton}
                    onClick={toggleSidebar}
                    aria-label="Open navigation"
                >
                    ☰
                </button>
                <Link to="/" className={styles.logo}>
                    Shopiy
                </Link>
            </div>

            <nav className={styles.nav}>
                <Link to="/catalog" className={styles.navLink}>
                    Catalog
                </Link>
                <Link to="/cart" className={styles.navLink}>
                    Cart ({totalItems})
                </Link>
                <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => logout.mutate()}
                    disabled={logout.isPending}
                >
                    Log out
                </button>
            </nav>
        </header>
    );
}
