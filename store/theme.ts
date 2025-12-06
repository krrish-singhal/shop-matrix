import { create } from "zustand";

interface ThemeState {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
}

export const useTheme = create<ThemeState>((set) => ({
  theme: typeof window !== "undefined" && localStorage.getItem("theme") === "dark" ? "dark" : "light",
  setTheme: (theme) => {
    set({ theme });
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  },
}));
