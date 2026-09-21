"use client";
import { useEffect, useState } from "react";
export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem("shopin-theme");
        if (savedTheme === "dark") {
            document.documentElement.dataset.theme = "dark";
            setDarkMode(true);
        } else {
            document.documentElement.dataset.theme = "light";
            setDarkMode(false);
        }
    }, []);
    const toggleTheme = () => {
        const nextTheme = darkMode ? "light" : "dark";
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem("shopin-theme", nextTheme);
        setDarkMode(nextTheme === "dark");
    };
    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={
                darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
            title={
                darkMode
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            }
        >
            <span className="theme-toggle-icon">
                {darkMode ? "☀" : "☾"}
            </span>

            <span>
                {darkMode ? "Light" : "Dark"}
            </span>
        </button>
    );
}