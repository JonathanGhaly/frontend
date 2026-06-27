import api from "../../../config/axios";

export const logout = async () => {
    await api.post("/api/v1/auth/logout");
};
