import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import { LoginPage } from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import {Layout} from "../components/Layout";

const HomePage = () => <h1>Home</h1>;

const CatalogPage = () => <h1>Catalog</h1>;

const CheckoutPage = () => <h1>Checkout</h1>;

const AdminDashboard = () => <h1>Admin Dashboard</h1>;

const ForbiddenPage = () => (
    <h1>403 - Forbidden</h1>
);

const NotFoundPage = () => (
    <h1>404 - Page Not Found</h1>
);

const AppRouter = () => {
    return (
        <BrowserRouter>
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
                        element={<Layout />}
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
                            path="/checkout"
                            element={<CheckoutPage />}
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
                        element={<Layout />}
                    >
                        <Route
                            path="/admin"
                            element={
                                <AdminDashboard />
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
        </BrowserRouter>
    );
};

export default AppRouter;