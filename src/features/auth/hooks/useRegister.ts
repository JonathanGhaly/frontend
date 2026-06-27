import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { register } from "../api/register";
import { useAuthStore } from "../../../store/authStore";

export const useRegister = () => {
    const navigate = useNavigate();
    const setLogin = useAuthStore((state) => state.login);

    return useMutation({
        mutationFn: register,
        onSuccess: (data) => {
            setLogin(data.accessToken, data.refreshToken, data.user);
            navigate("/");
        },
    });
};
