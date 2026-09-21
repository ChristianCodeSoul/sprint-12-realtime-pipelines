"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "@/store/api/api";

export default function CheckoutPage() {

    const router = useRouter();

    const cartItems = useSelector(
        (state) => state.cart.items
    );

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [createOrder, { isLoading, isSuccess, error }] =
        useCreateOrderMutation();

    const total = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (cartItems.length === 0) {
            return;
        }

        try {
            const userResponse = await fetch(
                "http://localhost:4000/api/users",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        email,
                    }),
                }
            );


            const userData = await userResponse.json();
            let userId;


            if (userResponse.status === 201) {
                userId = userData.data._id;
            } else if (userResponse.status === 409) {
                setUserMessage(
                    "This email is already registered. Your order will be linked to the existing account."
                );

                const existingUserResponse = await fetch(
                    `http://localhost:4000/api/users`
                );

                const existingUsers = await existingUserResponse.json();

                const existingUser = existingUsers.data.find((user) => user.email === email
                );

                if (!existingUser) {
                    throw new Error("Unable to find user");
                }

                userId = existingUser._id;
            } else {
                throw new Error(
                    userData.message || "Failed to create user"
                );
            }

            await createOrder({
                user: userId,
                items: cartItems.map((item) => ({
                    product: item.productId,
                    quantity: item.quantity,
                    price: item.price,
                })),
                totalAmount: total,
            }).unwrap();
        } catch (err) {
            console.error(err);
        }
    };

    if (isSuccess) {
        return (
            <main className="section">
                <div className="container">
                    <p className="eyebrow">ORDER</p>
                    <h1>Order placed successfully.</h1>
                    <p>Your transaction has been completed.</p>
                    <Link href="/products" className="button">Continue Shopping</Link>
                </div>
            </main>
        );
    }
    return (
        <main className="section">
            <div className="container">
                <div className="section-heading">
                    <p className="eyebrow">CHECKOUT</p>
                    <h1>Complete Your Order</h1>
                    <p className="page-description">Enter your details and review your order before placing it.</p>
                </div>
                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty.</p>
                        <Link href="/products" className="button">Browse Products</Link>
                    </div>
                ) : (
                    <div className="checkout-layout">
                        <form onSubmit={handleSubmit} className="checkout-form">
                            <div className="checkout-card">
                                <p className="eyebrow">CUSTOMER DETAILS</p>
                                <h2>Your Information</h2>
                                <div className="checkout-field">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <div className="checkout-field">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="checkout-card">
                                <p className="eyebrow">ORDER</p>
                                <h2>Review Your Order</h2>
                                {cartItems.map((item) => (
                                    <div className="checkout-item" key={item.productId}>
                                        <div>
                                            <strong>
                                                {item.title}
                                            </strong>
                                            <p>
                                                {item.quantity} × Rs. {item.price}
                                            </p>
                                        </div>
                                        <strong>
                                            Rs. {item.price * item.quantity}
                                        </strong>
                                    </div>
                                ))}
                            </div>
                            <button type="submit" className="button checkout-submit" disabled={isLoading}>
                                {isLoading
                                    ? "Placing Order..."
                                    : "Place Order"}
                            </button>
                            {userMessage && (
                                <p role="status">
                                    {userMessage}
                                </p>
                            )}
                            {error && (
                                <p role="alert">Failed to place order.</p>
                            )}
                        </form>

                        <aside className="checkout-summary">
                            <p className="eyebrow">SUMMARY</p>
                            <h2>Order Total</h2>
                            <div className="checkout-summary-row">
                                <span>Items</span>
                                <span>
                                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                                </span>
                            </div>
                            <div className="checkout-summary-total">
                                <span>Total</span>
                                <strong>Rs. {total}</strong>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}