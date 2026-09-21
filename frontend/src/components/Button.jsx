"use client";
import "./Button.css";
export default function Button({
    children = "Button",
    variant = "primary",
    disabled = false,
    loading = false,
    onClick,
}) {
    const isDisabled = disabled || loading;
    return (
        <button
            type="button"
            className={`storybook-button storybook-button--${variant}`}
            disabled={isDisabled}
            aria-busy={loading}
            onClick={onClick}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}