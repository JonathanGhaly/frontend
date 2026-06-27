import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../api/login";
import { useAuthStore } from "../../../store/authStore";

export const useLogin = () => {
    const navigate = useNavigate();
    const setLogin = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            setLogin(data.accessToken, data.refreshToken, data.user);
            navigate("/");
        },
    });
};
