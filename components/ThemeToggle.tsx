"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(true); // Default to dark
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved preference only on client
    const savedMode = localStorage.getItem("theme");
    // Default to dark mode if no preference saved
    const isDark = savedMode === "light" ? false : true;
    setDarkMode(isDark);
    applyTheme(isDark);
  }, []);

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      // Dark mode: dark blue background, white text
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      document.body.style.backgroundColor = "#161d53";
      document.body.style.color = "#ffffff";
    } else {
      // Light mode: white background, dark text (Sun icon = light mode)
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#161d53";
    }
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    applyTheme(newMode);
  };

  // Prevent hydration mismatch by always rendering same initial state
  if (!mounted) {
    return (
      <button 
        className="p-2 rounded-full transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: "#3ab8a3",
          color: "white",
        }}
        aria-label="Toggle dark mode"
        suppressHydrationWarning
      >
        <Sun className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full transition-all duration-300 hover:scale-110"
      style={{
        backgroundColor: "#3ab8a3",
        color: "white",
      }}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
