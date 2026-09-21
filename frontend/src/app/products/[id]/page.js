"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetProductQuery } from "@/store/api/api";
import { addToCart } from "@/store/slices/cartSlice";
export default function ProductDetailPage() {
    const params = useParams();
    const dispatch = useDispatch();
    const [showCartNotice, setShowCartNotice] = useState(false);
    const {
        data,
        error,
        isLoading,
    } = useGetProductQuery(params.id);
    const product = data?.data;
    useEffect(() => {
        if (!showCartNotice) {
            return;
        }
        const timer = setTimeout(() => {
            setShowCartNotice(false);
        }, 3500);
        return () => clearTimeout(timer);
    }, [showCartNotice]);
    const handleAddToCart = () => {
        if (!product) return;
        dispatch(addToCart(product));
        setShowCartNotice(true);
    };
    const closeCartNotice = () => {
        setShowCartNotice(false);
    };
    if (isLoading) {
        return (
            <main>
                <section className="section">
                    <div className="container page-loading">
                        <p className="eyebrow">Loading product...</p>
                        <h1>Just a moment</h1>
                    </div>
                </section>
            </main>
        );
    }
    if (error || !product) {
        return (
            <main>
                <section className="section">
                    <div className="container error-page">
                        <p className="eyebrow">ERROR</p>
                        <h1>Product not found!</h1>
                        <Link
                            href="/products"
                            className="button"
                        >
                            Back to all products
                        </Link>
                    </div>
                </section>
            </main>
        );
    }
    return (
        <>
            <header className="site-header">
                <div className="container header-inner">
                    <Link href="/" className="logo">
                        ShopIn.
                    </Link>
                    <nav className="nav">
                        <Link href="/">Home</Link>
                        <Link href="/products">
                            Products
                        </Link>
                        <Link href="/cart">
                            Cart
                        </Link>
                    </nav>
                </div>
            </header>
            <main>
                <section className="section">
                    <div className="container">
                        <Link
                            href="/products"
                            className="back-link"
                        >
                            ← Back to all products
                        </Link>
                        <div className="product-detail-grid">
                            <div className="product-detail-image">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    width={800}
                                    height={800}
                                />
                            </div>
                            <div className="product-detail-content">
                                <p className="eyebrow">
                                    {product.category}
                                </p>
                                <h1>{product.title}</h1>
                                <p className="product-detail-description">
                                    {product.description}
                                </p>
                                <div className="product-detail-info">
                                    <p>
                                        <strong>
                                            Category:
                                        </strong>{" "}
                                        {product.category}
                                    </p>
                                    <p>
                                        <strong>
                                            Availability:
                                        </strong>{" "}
                                        {product.stock > 0
                                            ? "In Stock"
                                            : "Out of Stock"}
                                    </p>
                                </div>
                                <div className="product-detail-meta">
                                    <strong>
                                        Rs. {product.price}
                                    </strong>
                                </div>
                                <button
                                    type="button"
                                    className="button"
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                >
                                    {product.stock === 0
                                        ? "Out of Stock"
                                        : "Add to Cart"}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            {showCartNotice && (
                <div
                    className="cart-toast"
                    role="status"
                    aria-live="polite"
                >
                    <div className="cart-toast-icon">
                        ✔
                    </div>
                    <div className="cart-toast-message">
                        <strong>Added to cart</strong>
                        <span>
                            {product.title} was added to your cart.
                        </span>
                    </div>
                    <Link
                        href="/cart"
                        className="cart-toast-cart"
                    >
                        View your Cart
                    </Link>
                    <button
                        type="button"
                        className="cart-toast-close"
                        onClick={closeCartNotice}
                        aria-label="Close notification"
                    >
                        ×
                    </button>
                </div>
            )}
            <footer className="site-footer">
                <div className="container">
                    ShopIn. | Advanced Ecommerce | 2026.
                </div>
            </footer>
        </>
    );
}