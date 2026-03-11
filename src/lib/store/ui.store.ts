import { create } from "zustand";

interface UIStore {
    viewMode: "grid" | "list";
    sidebarOpen: boolean;
    shinyMode: boolean;
    searchOpen: boolean;
    toggleViewMode: () => void;
    setViewMode: (mode: "grid" | "list") => void;
    toggleSidebar: () => void;
    setSidebarOpen: (isOpen: boolean) => void;
    toggleShinyMode: () => void;
    setSearchOpen: (isOpen: boolean) => void;
    openSearch: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
    viewMode: "grid",
    sidebarOpen: false,
    shinyMode: false,
    searchOpen: false,
    toggleViewMode: () => set((state) => ({ viewMode: state.viewMode === "grid" ? "list" : "grid" })),
    setViewMode: (mode) => set({ viewMode: mode }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
    toggleShinyMode: () => set((state) => ({ shinyMode: !state.shinyMode })),
    setSearchOpen: (isOpen) => set({ searchOpen: isOpen }),
    openSearch: () => set({ searchOpen: true }),
}));
