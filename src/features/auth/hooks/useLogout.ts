import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/logout";
import { useAuthStore } from "../../../store/authStore";

export const useLogout = () => {
    const navigate = useNavigate();
    const clearAuth = useAuthStore((state) => state.logout);

    return useMutation({
        mutationFn: logout,
        onSettled: () => {
            clearAuth();
            navigate("/login");
        },
    });
};
