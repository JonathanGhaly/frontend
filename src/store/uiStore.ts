import { create } from "zustand";

interface UiState {
    loading: boolean;
    sidebarOpen: boolean;
    theme: "light" | "dark";
    searchQuery: string;

    setLoading: (loading: boolean) => void;

    toggleSidebar: () => void;

    closeSidebar: () => void;

    openSidebar: () => void;

    setTheme: (
        theme: "light" | "dark"
    ) => void;

    setSearchQuery: (query: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
    loading: false,

    sidebarOpen: false,

    theme: "light",

    searchQuery: "",

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

    setSearchQuery: (query) =>
        set({
            searchQuery: query,
        }),
}));
