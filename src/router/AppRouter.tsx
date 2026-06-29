import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../components/MainLayout";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import CatalogPage from "../features/catalog/pages/CatalogPage";
import ProductPage from "../features/catalog/pages/ProductPage";
import CartPage from "../features/checkout/pages/CartPage";
import CheckoutPage from "../features/checkout/pages/CheckoutPage";
import OrderSuccessPage from "../features/checkout/pages/OrderSuccessPage";
import OrderHistoryPage from "../features/checkout/pages/OrderHistoryPage";
import AdminDashboardPage from "../features/admin/pages/AdminDashboardPage";
import AdminProductsPage from "../features/admin/pages/AdminProductsPage";
import AdminCategoriesPage from "../features/admin/pages/AdminCategoriesPage";
import AdminOrdersPage from "../features/admin/pages/AdminOrdersPage";
import AdminOrderDetailsPage from "../features/admin/pages/AdminOrderDetailsPage";

const ForbiddenPage = () => (
    <div className="max-w-md mx-auto text-center py-16 px-4">
        <h1 className="text-4xl font-extrabold text-rose-500 font-display">403 - Forbidden</h1>
        <p className="text-sm text-slate-500 mt-2">You do not have the required permissions to view this control console.</p>
        <Link to="/" className="text-indigo-650 font-bold hover:underline mt-4 inline-block">Return to Storefront</Link>
    </div>
);

// We need to import Link for ForbiddenPage. Let's make sure it's imported
import { Link } from "react-router-dom";

const NotFoundPage = () => (
    <div className="max-w-md mx-auto text-center py-16 px-4">
        <h1 className="text-4xl font-extrabold text-slate-800 font-display">404 - Page Not Found</h1>
        <p className="text-sm text-slate-500 mt-2">The request space panel does not exist or has been relocated.</p>
        <Link to="/" className="text-indigo-650 font-bold hover:underline mt-4 inline-block">Return to Storefront</Link>
    </div>
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

            {/* ---------- Protected Layout ---------- */}
            <Route element={<ProtectedRoute />}>
                <Route element={<MainLayout />}>
                    <Route
                        index
                        element={<CatalogPage />}
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

                    <Route
                        path="/orders"
                        element={<OrderHistoryPage />}
                    />

                    {/* ---------- Admin Only ---------- */}
                    <Route
                        element={
                            <ProtectedRoute
                                roles={["Admin"]}
                            />
                        }
                    >
                        <Route
                            path="/admin"
                            element={<AdminDashboardPage />}
                        />

                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboardPage />}
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
                            element={<AdminOrderDetailsPage />}
                        />
                    </Route>
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
