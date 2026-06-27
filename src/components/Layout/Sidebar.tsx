import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useUiStore } from "../../store/uiStore";
import styles from "./Layout.module.css";

export default function Sidebar() {
    const user = useAuthStore((state) => state.user);
    const isAdmin = user?.roles?.includes("Admin");
    const sidebarOpen = useUiStore((state) => state.sidebarOpen);
    const closeSidebar = useUiStore((state) => state.closeSidebar);

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `${styles.sidebarItem} ${
            isActive ? styles.sidebarItemActive : ""
        }`;

    return (
        <>
            <div
                className={`${styles.sidebarOverlay} ${
                    sidebarOpen ? styles.openSidebar : ""
                }`}
                onClick={closeSidebar}
            />

            <aside
                className={`${styles.sidebar} ${styles.mobileSidebar} ${
                    sidebarOpen ? styles.mobileSidebarOpen : ""
                }`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={styles.sidebarHeader}>
                    <p className={styles.sidebarTitle}>Explore</p>
                    <p className={styles.sidebarSubtitle}>
                        {user?.fullName ?? "Your dashboard"}
                    </p>
                </div>

                <NavLink
                    to="/catalog"
                    className={linkClass}
                    onClick={closeSidebar}
                >
                    Products
                </NavLink>
                <NavLink
                    to="/cart"
                    className={linkClass}
                    onClick={closeSidebar}
                >
                    Cart
                </NavLink>

                {isAdmin && (
                    <>
                        <p className={styles.sectionLabel}>Admin</p>
                        <NavLink
                            to="/admin"
                            className={linkClass}
                            onClick={closeSidebar}
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/admin/products"
                            className={linkClass}
                            onClick={closeSidebar}
                        >
                            Manage products
                        </NavLink>
                        <NavLink
                            to="/admin/categories"
                            className={linkClass}
                            onClick={closeSidebar}
                        >
                            Manage categories
                        </NavLink>
                        <NavLink
                            to="/admin/orders"
                            className={linkClass}
                            onClick={closeSidebar}
                        >
                            Manage orders
                        </NavLink>
                    </>
                )}
            </aside>
        </>
    );
}
