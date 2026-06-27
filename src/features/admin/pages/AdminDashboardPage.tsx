import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../../catalog/hooks/useCategories";
import { useProducts } from "../../catalog/hooks/useProducts";
import { useAdminOrders } from "../hooks/useAdminOrders";
import styles from "../../../components/Layout/Layout.module.css";

const AdminDashboardPage = () => {
    const { data: products } = useProducts();
    const { data: categories = [] } = useCategories();
    const { data: orders = [] } = useAdminOrders();

    const stats = useMemo(
        () => [
            {
                label: "Products",
                value: products?.totalCount ?? 0,
                link: "/admin/products",
            },
            {
                label: "Categories",
                value: categories.length,
                link: "/admin/categories",
            },
            {
                label: "Orders",
                value: orders.length,
                link: "/admin/orders",
            },
        ],
        [categories.length, orders.length, products?.totalCount]
    );

    return (
        <div>
            <h1 className={styles.pageTitle}>Admin dashboard</h1>

            <section className={styles.section}>
                <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                    {stats.map((stat) => (
                        <Link
                            key={stat.label}
                            to={stat.link}
                            className={styles.heroCard}
                            style={{ padding: "1.5rem", textAlign: "left" }}
                        >
                            <p style={{ margin: 0, fontSize: "0.9rem", color: "#64748b" }}>
                                {stat.label}
                            </p>
                            <p style={{ margin: "0.75rem 0 0", fontSize: "2.1rem", fontWeight: 800, color: "#0f172a" }}>
                                {stat.value}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className={styles.section} style={{ marginTop: "1.5rem" }}>
                <h2 style={{ marginTop: 0 }}>Quick navigation</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    <Link className={styles.heroButton} to="/admin/products">
                        Products
                    </Link>
                    <Link className={styles.heroButton} to="/admin/categories">
                        Categories
                    </Link>
                    <Link className={styles.heroButton} to="/admin/orders">
                        Orders
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboardPage;
