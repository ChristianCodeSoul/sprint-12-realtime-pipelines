"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "@/store/api/api";
import { addToCart } from "@/store/slices/cartSlice";
import ThemeToggle from "../ThemeToggle";
export default function ProductsPage() {
    const dispatch = useDispatch();
    const pathname = usePathname();

    const cartItems = useSelector(
        (state) => state.cart.items
    );
    const {
        data,
        error,
        isLoading,
    } = useGetProductsQuery();
    const products = data?.data ?? [];
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] =
        useState("all");
    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                products
                    .map((product) => product.category)
                    .filter(Boolean)
            ),
        ];
        return uniqueCategories;
    }, [products]);
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const search = searchTerm
                .trim()
                .toLowerCase();
            const matchesSearch =
                !search ||
                product.title
                    ?.toLowerCase()
                    .includes(search) ||
                product.description
                    ?.toLowerCase()
                    .includes(search) ||
                product.category
                    ?.toLowerCase()
                    .includes(search);
            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;
            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [
        products,
        searchTerm,
        selectedCategory,
    ]);
    const handleAddToCart = (event, product) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch(addToCart(product));
    };
    const getDiscountPercentage = (product) => {
        if (product.discountPercentage > 0) {
            return Math.round(
                product.discountPercentage
            );
        }
        if (
            product.originalPrice &&
            product.originalPrice > product.price
        ) {
            return Math.round(
                ((product.originalPrice -
                    product.price) /
                    product.originalPrice) *
                100
            );
        }
        return 0;
    };
    if (isLoading) {
        return (
            <>
                <header className="site-header">
                    <div className="container header-inner">
                        <Link
                            href="/"
                            className="logo"
                        >
                            ShopIn.
                        </Link>
                        <div className="header-actions">
                            <nav className="nav">
                                <Link href="/">
                                    Home
                                </Link>
                                <Link
                                    href="/products"
                                    className={
                                        pathname ===
                                            "/products"
                                            ? "active"
                                            : ""
                                    }
                                >
                                    Products
                                </Link>
                                <Link href="/cart">
                                    Cart (
                                    {
                                        cartItems.length
                                    }
                                    )
                                </Link>
                            </nav>
                            <ThemeToggle />
                        </div>
                    </div>
                </header>
                <main>
                    <section className="section">
                        <div className="container">
                            <p className="eyebrow">COLLECTION</p>
                            <h1>Loading products...</h1>
                            <div className="product-skeleton-grid">
                                {[
                                    1, 2, 3, 4, 5, 6,
                                ].map((item) => (
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
                </main>
            </>
        );
    }
    if (error) {
        return (
            <>
                <header className="site-header">
                    <div className="container header-inner">
                        <Link
                            href="/"
                            className="logo"
                        >
                            ShopIn.
                        </Link>
                        <div className="header-actions">
                            <nav className="nav">
                                <Link href="/">
                                    Home
                                </Link>
                                <Link
                                    href="/products"
                                    className="active"
                                >
                                    Products
                                </Link>
                                <Link href="/cart">
                                    Cart (
                                    {
                                        cartItems.length
                                    }
                                    )
                                </Link>
                            </nav>
                            <ThemeToggle />
                        </div>
                    </div>
                </header>
                <main>
                    <section className="section">
                        <div className="container error-page">
                            <p className="eyebrow">ERROR</p>
                            <h1>Could not load products.</h1>
                            <p>Make sure the backend is running and try again.</p>
                        </div>
                    </section>
                </main>
            </>
        );
    }
    return (
        <>
            <header className="site-header">
                <div className="container header-inner">
                    <Link
                        href="/"
                        className="logo"
                    >
                        ShopIn.
                    </Link>

                    <div className="header-actions">
                        <nav className="nav">
                            <Link
                                href="/"
                                className={
                                    pathname === "/"
                                        ? "active"
                                        : ""
                                }
                            >
                                Home
                            </Link>

                            <Link
                                href="/products"
                                className={
                                    pathname ===
                                        "/products"
                                        ? "active"
                                        : ""
                                }
                            >
                                Products
                            </Link>
                            <Link
                                href="/cart"
                                className={
                                    pathname === "/cart"
                                        ? "active"
                                        : ""
                                }
                            >
                                Cart (
                                {cartItems.length}
                                )
                            </Link>
                        </nav>
                        <ThemeToggle />
                    </div>
                </div>
            </header>
            <main>
                <section className="section">
                    <div className="container">
                        <div className="section-heading">
                            <p className="eyebrow">OUR COLLECTION</p>
                            <h1>All Products</h1>
                            <p className="page-description">Find something useful for everyday life.</p>
                        </div>

                        <div className="product-controls">
                            <div className="product-search">
                                <label
                                    htmlFor="product-search"
                                    className="sr-only"
                                >
                                    Search products
                                </label>
                                <input
                                    id="product-search"
                                    type="search"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(
                                            event.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="category-filter">
                                <button
                                    type="button"
                                    className={
                                        selectedCategory ===
                                            "all"
                                            ? "filter-button active"
                                            : "filter-button"
                                    }
                                    onClick={() =>
                                        setSelectedCategory(
                                            "all"
                                        )
                                    }
                                >
                                    All
                                </button>
                                {categories.map(
                                    (category) => (
                                        <button
                                            type="button"
                                            key={
                                                category
                                            }
                                            className={
                                                selectedCategory ===
                                                    category
                                                    ? "filter-button active"
                                                    : "filter-button"
                                            }
                                            onClick={() =>
                                                setSelectedCategory(
                                                    category
                                                )
                                            }
                                        >
                                            {category}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="products-result-info">
                            <span>
                                {
                                    filteredProducts.length
                                }{" "}
                                product
                                {filteredProducts.length !==
                                    1
                                    ? "s"
                                    : ""}
                            </span>
                            {(searchTerm ||
                                selectedCategory !==
                                "all") && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSearchTerm(
                                                ""
                                            );
                                            setSelectedCategory(
                                                "all"
                                            );
                                        }}
                                    >
                                        Clear filters
                                    </button>
                                )}
                        </div>
                        {filteredProducts.length ===
                            0 ? (
                            <div className="empty-products">
                                <p className="eyebrow">NO RESULTS</p>
                                <h2>Nothing matched your search.</h2>
                                <p>Try a different product name or category.</p>
                                <button
                                    type="button"
                                    className="button"
                                    onClick={() => {
                                        setSearchTerm(
                                            ""
                                        );
                                        setSelectedCategory(
                                            "all"
                                        );
                                    }}
                                >
                                    Show All Products
                                </button>
                            </div>
                        ) : (
                            <div className="product-grid">
                                {filteredProducts.map(
                                    (product) => {
                                        const discount =
                                            getDiscountPercentage(
                                                product
                                            );
                                        const hasOriginalPrice =
                                            product.originalPrice &&
                                            product.originalPrice >
                                            product.price;
                                        return (
                                            <article
                                                className="product-card"
                                                key={
                                                    product._id
                                                }
                                            >
                                                <Link
                                                    href={`/products/${product._id}`}
                                                    className="product-card-link"
                                                >
                                                    <div className="product-image">
                                                        {discount >
                                                            0 && (
                                                                <span className="product-discount">
                                                                    -
                                                                    {
                                                                        discount
                                                                    }
                                                                    %
                                                                </span>
                                                            )}

                                                        <Image
                                                            src={
                                                                product.image
                                                            }
                                                            alt={
                                                                product.title
                                                            }
                                                            width={
                                                                600
                                                            }
                                                            height={
                                                                600
                                                            }
                                                        />
                                                    </div>

                                                    <div className="product-content">
                                                        <p className="product-category">
                                                            {
                                                                product.category
                                                            }
                                                        </p>

                                                        <h2>
                                                            {
                                                                product.title
                                                            }
                                                        </h2>

                                                        <p className="product-description">
                                                            {
                                                                product.description
                                                            }
                                                        </p>

                                                        <div className="product-price">
                                                            <strong>
                                                                Rs.{" "}
                                                                {
                                                                    product.price
                                                                }
                                                            </strong>
                                                            {hasOriginalPrice && (
                                                                <span className="product-original-price">
                                                                    Rs.{" "}
                                                                    {
                                                                        product.originalPrice
                                                                    }
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div className="product-card-action">
                                                    <button
                                                        type="button"
                                                        className="button"
                                                        onClick={(
                                                            event
                                                        ) =>
                                                            handleAddToCart(
                                                                event,
                                                                product
                                                            )
                                                        }
                                                        disabled={
                                                            product.stock ===
                                                            0
                                                        }
                                                    >
                                                        {product.stock ===
                                                            0
                                                            ? "Out of Stock"
                                                            : "Add to Cart"}
                                                    </button>
                                                    <Link
                                                        href={`/products/${product._id}`}
                                                        className="product-view-link"
                                                    >
                                                        View Details →
                                                    </Link>
                                                </div>
                                            </article>
                                        );
                                    }
                                )}
                            </div>
                        )}
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