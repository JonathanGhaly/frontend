import {
    Link,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import CatalogPage from "../features/catalog/pages/CatalogPage";
import ProductPage from "../features/catalog/pages/ProductPage";
import CartPage from "../features/checkout/pages/CartPage";
import CheckoutPage from "../features/checkout/pages/CheckoutPage";
import OrderSuccessPage from "../features/checkout/pages/OrderSuccessPage";
import AdminDashboardPage from "../features/admin/pages/AdminDashboardPage";
import AdminProductsPage from "../features/admin/pages/AdminProductsPage";
import AdminCategoriesPage from "../features/admin/pages/AdminCategoriesPage";
import AdminOrdersPage from "../features/admin/pages/AdminOrdersPage";
import AdminOrderDetailsPage from "../features/admin/pages/AdminOrderDetailsPage";

import { MainLayout } from "../components/Layout";

import styles from "../components/Layout/Layout.module.css";

const HomePage = () => (
    <div className={styles.homeHero}>
        <section className={styles.heroCard}>
            <span className={styles.heroBadge}>Fast checkout</span>
            <h1 className={styles.heroTitle}>Shop smarter, faster, and with confidence.</h1>
            <p className={styles.heroText}>
                Discover products, save your favorites, and complete checkout with a clean, modern storefront built for effortless shopping.
            </p>
            <div className={styles.heroActions}>
                <Link to="/catalog" className={styles.heroButton}>
                    Browse catalog
                </Link>
                <Link to="/cart" className={styles.heroButtonSecondary}>
                    View cart
                </Link>
            </div>
        </section>
    </div>
);

const ForbiddenPage = () => (
    <h1>403 - Forbidden</h1>
);

const NotFoundPage = () => (
    <h1>404 - Page Not Found</h1>
);

const AppRouter = () => {
    return (
        <Routes>
                {/* ---------- Public ---------- */}

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/register"
                    element={<RegisterPage />}
                />

                {/* ---------- Protected ---------- */}

                <Route element={<ProtectedRoute />}>
                    <Route
                        element={<MainLayout />}
                    >
                        <Route
                            index
                            element={<HomePage />}
                        />

                        <Route
                            path="/catalog"
                            element={<CatalogPage />}
                        />

                        <Route
                            path="/catalog/:id"
                            element={<ProductPage />}
                        />

                        <Route
                            path="/cart"
                            element={<CartPage />}
                        />

                        <Route
                            path="/checkout"
                            element={<CheckoutPage />}
                        />

                        <Route
                            path="/checkout/success"
                            element={<OrderSuccessPage />}
                        />
                    </Route>
                </Route>

                {/* ---------- Admin ---------- */}

                <Route
                    element={
                        <ProtectedRoute
                            roles={["Admin"]}
                        />
                    }
                >
                    <Route
                        element={<MainLayout />}
                    >
                        <Route
                            path="/admin"
                            element={
                                <AdminDashboardPage />
                            }
                        />

                        <Route
                            path="/admin/dashboard"
                            element={
                                <AdminDashboardPage />
                            }
                        />

                        <Route
                            path="/admin/products"
                            element={<AdminProductsPage />}
                        />

                        <Route
                            path="/admin/categories"
                            element={<AdminCategoriesPage />}
                        />

                        <Route
                            path="/admin/orders"
                            element={<AdminOrdersPage />}
                        />

                        <Route
                            path="/admin/orders/:id"
                            element={
                                <AdminOrderDetailsPage />
                            }
                        />
                    </Route>
                </Route>

                {/* ---------- Errors ---------- */}

                <Route
                    path="/403"
                    element={<ForbiddenPage />}
                />

                <Route
                    path="/404"
                    element={<NotFoundPage />}
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/404"
                            replace
                        />
                    }
                />
            </Routes>
    );
};

export default AppRouter;
