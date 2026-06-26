import { create } from "zustand";

interface UiState {
    loading: boolean;
    sidebarOpen: boolean;
    theme: "light" | "dark";

    setLoading: (loading: boolean) => void;

    toggleSidebar: () => void;

    closeSidebar: () => void;

    openSidebar: () => void;

    setTheme: (
        theme: "light" | "dark"
    ) => void;
}

export const useUiStore = create<UiState>((set) => ({
    loading: false,

    sidebarOpen: false,

    theme: "light",

    setLoading: (loading) =>
        set({
            loading,
        }),

    toggleSidebar: () =>
        set((state) => ({
            sidebarOpen: !state.sidebarOpen,
        })),

    closeSidebar: () =>
        set({
            sidebarOpen: false,
        }),

    openSidebar: () =>
        set({
            sidebarOpen: true,
        }),

    setTheme: (theme) =>
        set({
            theme,
        }),
}));