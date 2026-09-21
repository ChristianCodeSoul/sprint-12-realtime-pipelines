"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
    const pathname = usePathname();
    const cartItems = useSelector((state) => state.cart.items);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="site-header">
            <div className="container header-inner">
                <Link href="/" className="logo" onClick={closeMenu}>
                    ShopIn.
                </Link>

                <div className="header-actions">
                    <button
                        type="button"
                        className="mobile-menu-toggle"
                        onClick={() => setIsMenuOpen((open) => !open)}
                        aria-expanded={isMenuOpen}
                        aria-controls="main-navigation"
                        aria-label={
                            isMenuOpen
                                ? "Close navigation menu"
                                : "Open navigation menu"
                        }
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </button>

                    <nav
                        id="main-navigation"
                        className={`nav ${isMenuOpen ? "nav-open" : ""}`}
                        aria-label="Main navigation"
                    >
                        <Link
                            href="/"
                            className={pathname === "/" ? "active" : ""}
                            onClick={closeMenu}
                        >
                            Home
                        </Link>

                        <Link
                            href="/products"
                            className={
                                pathname === "/products" ? "active" : ""
                            }
                            onClick={closeMenu}
                        >
                            Products
                        </Link>

                        <Link
                            href="/cart"
                            className={pathname === "/cart" ? "active" : ""}
                            onClick={closeMenu}
                        >
                            <span>Cart</span>
                            <span className="cart-count">
                                {cartItems.length}
                            </span>
                        </Link>

                        <div className="mobile-theme-toggle">
                            <ThemeToggle />
                        </div>
                    </nav>

                    <div className="desktop-theme-toggle">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </header>
    );

}
