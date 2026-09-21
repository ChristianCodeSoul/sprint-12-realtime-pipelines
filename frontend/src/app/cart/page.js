"use client";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} from "@/store/slices/cartSlice";
import ThemeToggle from "../ThemeToggle";
export default function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector(
        (state) => state.cart.items
    );
    const total = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );
    if (cartItems.length === 0) {
        return (
            <>
                <header className="site-header">
                    <div className="container header-inner">
                        <Link href="/" className="logo">
                            ShopIn.
                        </Link>

                        <div className="header-actions">
                            <nav className="nav">
                                <Link href="/">
                                    Home
                                </Link>

                                <Link href="/products">
                                    Products
                                </Link>

                                <Link href="/cart">
                                    Cart (0)
                                </Link>
                            </nav>
                            <ThemeToggle />
                        </div>
                    </div>
                </header>
                <main>
                    <section className="section">
                        <div className="container empty-cart">
                            <p className="eyebrow">CART</p>
                            <h1>Nothing here yet.</h1>
                            <p>Find something you like.</p>
                            <Link href="/products" className="button">Browse Products</Link>
                        </div>
                    </section>
                </main>
                <footer className="site-footer">
                    <div className="container">
                        ShopIn. | Advanced Ecommerce | 2026.
                    </div>
                </footer>
            </>
        );
    }

    return (
        <>
            <header className="site-header">
                <div className="container header-inner">
                    <Link href="/" className="logo">ShopIn.</Link>
                    <div className="header-actions">
                        <nav className="nav">
                            <Link href="/">Home</Link>
                            <Link href="/products">Products</Link>
                            <Link href="/cart">Cart ({cartItems.length})</Link>
                        </nav>
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            <main>
                <section className="section">
                    <div className="container">
                        <div className="section-heading">
                            <p className="eyebrow">CART</p>
                            <h1>Your Cart</h1>
                            <p className="page-description">
                                Review the products you have added to your cart.
                            </p>
                        </div>
                        <div className="cart-layout">
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <article className="cart-item" key={item.productId}>
                                        <div className="cart-item-image">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                width={160}
                                                height={160}
                                            />
                                        </div>
                                        <div className="cart-item-content">
                                            <h2>
                                                {item.title}
                                            </h2>
                                            <p>
                                                Rs. {item.price}
                                            </p>
                                            <div className="cart-item-actions">
                                                <button
                                                    className="button"
                                                    type="button"
                                                    onClick={() =>
                                                        dispatch(
                                                            decreaseQuantity(
                                                                item.productId
                                                            )
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    className="button"
                                                    type="button"
                                                    onClick={() =>
                                                        dispatch(
                                                            increaseQuantity(
                                                                item.productId
                                                            )
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>
                                                <button
                                                    className="button"
                                                    type="button"
                                                    onClick={() =>
                                                        dispatch(
                                                            removeFromCart(
                                                                item.productId
                                                            )
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                            <aside className="cart-summary">
                                <p className="eyebrow">SUMMARY</p>
                                <h2>Your Order Summary</h2>
                                <div className="cart-summary-row">
                                    <span>Items</span>
                                    <span>
                                        {cartItems.reduce(
                                            (sum, item) =>
                                                sum +
                                                item.quantity,
                                            0
                                        )}
                                    </span>
                                </div>
                                <div className="cart-summary-row">
                                    <strong>Total</strong>
                                    <strong>Rs. {total}</strong>
                                </div>
                                <Link
                                    href="/checkout"
                                    className="button"
                                >
                                    Checkout
                                </Link>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="site-footer">
                <div className="container">
                    ShopIn. | Advanced Ecommerce | 2026.
                </div>
            </footer>
        </>
    );
}