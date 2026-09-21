
import Link from "next/link";

import Navbar from "./Navbar";
import HomeInteractive from "./HomeInteractive";

export default function Home() {
    return (
        <>
            <Navbar />

            <main>
                <section className="hero">
                    <div className="container">
                        <div className="hero-content">
                            <p className="eyebrow">
                                WELCOME TO ShopIn.
                            </p>

                            <h1>
                                Simple things.
                                <br />
                                Better picks.
                            </h1>

                            <p className="hero-description">
                                A simple place to discover useful things for everyday life.
                            </p>

                            <Link
                                href="/products"
                                className="button"
                            >
                                Explore Products
                            </Link>
                        </div>
                    </div>
                </section>

                <HomeInteractive />
            </main>

            <footer className="site-footer">
                <div className="container">
                    ShopIn. | Advanced Ecommerce | 2026.
                </div>
            </footer>
        </>
    );
}
