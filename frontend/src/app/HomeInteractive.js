"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useGetProductsQuery } from "../store/api/api";
import dynamic from "next/dynamic";

const ShopInAI = dynamic(() => import("./ShopInAI"), {
    ssr: false,
});

export default function HomeInteractive() {
    const {
        data,
        error,
        isLoading,
    } = useGetProductsQuery();

    const products = data?.data ?? [];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isAIChatOpen, setIsAIChatOpen] = useState(false);

    useEffect(() => {
        if (products.length <= 1) {
            return;
        }

        const timer = setInterval(() => {
            setActiveIndex((currentIndex) => {
                return (currentIndex + 1) % products.length;
            });
        }, 3500);

        return () => clearInterval(timer);
    }, [products.length]);

    const getProduct = (offset) => {
        if (products.length === 0) {
            return null;
        }

        const index =
            (activeIndex + offset + products.length) %
            products.length;

        return products[index];
    };

    const activeProduct = getProduct(0);
    const previousProduct = getProduct(-1);
    const nextProduct = getProduct(1);

    if (isLoading) {
        return (
            <>
                <section className="section">
                    <div className="container">
                        <p className="eyebrow">ShopIn.</p>
                        <h2>Loading products...</h2>

                        <div className="product-skeleton-grid">
                            {[1, 2, 3].map((item) => (
                                <div
                                    className="skeleton-card"
                                    key={item}
                                >
                                    <div className="skeleton-image" />
                                    <div className="skeleton-line skeleton-line-medium" />
                                    <div className="skeleton-line skeleton-line-short" />
                                    <div className="skeleton-line skeleton-line-description" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </>
        );
    }

    if (error) {
        return (
            <section className="section">
                <div className="container error-page">
                    <p className="eyebrow">ERROR</p>
                    <h2>Could not load products.</h2>
                    <p>
                        Something went wrong loading the products.
                        Please try refreshing in a moment.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <>
            <section
                className="section featured-section"
                id="products"
            >
                <div className="container">
                    <div className="section-heading">
                        <p className="eyebrow">COLLECTION</p>
                        <h2>Featured Products</h2>
                        <p className="page-description">
                            Explore our collection of carefully selected products.
                        </p>
                    </div>

                    {products.length > 0 && (
                        <>
                            <div className="product-showcase">
                                {previousProduct && (
                                    <Link
                                        href={`/products/${previousProduct._id}`}
                                        className="showcase-card showcase-card-side showcase-card-previous"
                                    >
                                        <div className="showcase-image">
                                            <Image
                                                src={previousProduct.image}
                                                alt={previousProduct.title}
                                                width={600}
                                                height={600}
                                            />
                                        </div>

                                        <div className="showcase-card-info">
                                            <span>{previousProduct.category}</span>
                                            <h3>{previousProduct.title}</h3>
                                        </div>
                                    </Link>
                                )}

                                {activeProduct && (
                                    <Link
                                        href={`/products/${activeProduct._id}`}
                                        className="showcase-card showcase-card-active"
                                        key={activeProduct._id}
                                    >
                                        <div className="showcase-image">
                                            <Image
                                                src={activeProduct.image}
                                                alt={activeProduct.title}
                                                width={800}
                                                height={800}
                                            />
                                        </div>

                                        <div className="showcase-card-info">
                                            <span>{activeProduct.category}</span>
                                            <h3>{activeProduct.title}</h3>
                                            <p>View product details →</p>
                                        </div>
                                    </Link>
                                )}

                                {nextProduct && (
                                    <Link
                                        href={`/products/${nextProduct._id}`}
                                        className="showcase-card showcase-card-side showcase-card-next"
                                    >
                                        <div className="showcase-image">
                                            <Image
                                                src={nextProduct.image}
                                                alt={nextProduct.title}
                                                width={600}
                                                height={600}
                                            />
                                        </div>

                                        <div className="showcase-card-info">
                                            <span>{nextProduct.category}</span>
                                            <h3>{nextProduct.title}</h3>
                                        </div>
                                    </Link>
                                )}
                            </div>

                            <div className="showcase-dots">
                                {products.map((product, index) => (
                                    <button
                                        type="button"
                                        key={product._id}
                                        className={
                                            index === activeIndex
                                                ? "showcase-dot active"
                                                : "showcase-dot"
                                        }
                                        onClick={() =>
                                            setActiveIndex(index)
                                        }
                                        aria-label={`Show ${product.title}`}
                                    />
                                ))}
                            </div>

                            <div className="showcase-action">
                                <Link
                                    href="/products"
                                    className="button"
                                >
                                    View All Products
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            <section className="section ai-section">
                <div className="container">
                    <div className="ai-card">
                        <div className="ai-icon">✦</div>

                        <p className="eyebrow">SHOPIN AI</p>

                        <h2>Your personal shopping assistant.</h2>

                        <p>
                            Need help finding something? ShopIn AI will help
                            you discover, compare and choose products.
                        </p>

                        <button
                            type="button"
                            className="button"
                            onClick={() => setIsAIChatOpen(true)}
                        >
                            Chat with ShopIn AI
                        </button>
                    </div>
                </div>
            </section>

            {isAIChatOpen && (
                <ShopInAI
                    products={products}
                    onClose={() => setIsAIChatOpen(false)}
                />
            )}
        </>
    );
}