import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
    roles?: string[];
}

const ProtectedRoute = ({
    roles,
}: ProtectedRouteProps) => {
    const { isAuthenticated, user } = useAuthStore();

    const location = useLocation();

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (
        roles &&
        roles.length > 0 &&
        !user?.roles.some((role) =>
            roles.includes(role)
        )
    ) {
        return (
            <Navigate
                to="/403"
                replace
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;