"use client";
import { useState } from "react";
export default function ShopInAI({ products, onClose }) {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content:
                "Hello! I'm ShopIn AI. What are you looking for today?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const sendMessage = async () => {
        const message = input.trim();
        if (!message || isLoading) {
            return;
        }
        const userMessage = {
            role: "user",
            content: message,
        };
        const conversation = [
            ...messages,
            userMessage,
        ];
        setMessages(conversation);
        setInput("");
        setIsLoading(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/ai/chat`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message,
                        products,
                        conversation,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(
                    data.message || "Something went wrong."
                );
            }
            setMessages((current) => [
                ...current,
                {
                    role: "assistant",
                    content: data.message,
                },
            ]);
        } catch (error) {
            console.error("ShopIn AI error:", error);
            setMessages((current) => [
                ...current,
                {
                    role: "assistant",
                    content:
                        "Sorry, I couldn't connect right now. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };
    return (
        <div className="ai-chat">
            <div className="ai-chat-header">
                <div>
                    <span className="ai-chat-status" />
                    <div>
                        <strong>ShopIn AI</strong>
                        <span>Shopping assistant</span>
                    </div>
                </div>
                <button
                    type="button"
                    className="ai-chat-close"
                    onClick={onClose}
                    aria-label="Close ShopIn AI"
                >
                    ×
                </button>
            </div>
            <div className="ai-chat-messages">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`ai-message ${message.role === "user"
                                ? "ai-message-user"
                                : "ai-message-assistant"
                            }`}
                    >
                        {message.content}
                    </div>
                ))}
                {isLoading && (
                    <div className="ai-message ai-message-assistant">
                        <span className="ai-thinking">ShopIn AI is thinking...</span>
                    </div>
                )}
            </div>
            <div className="ai-chat-input">
                <textarea
                    value={input}
                    onChange={(event) =>
                        setInput(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about our products..."
                    rows={1}
                    disabled={isLoading}
                />
                <button
                    type="button"
                    className="button"
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                >
                    Send
                </button>
            </div>
        </div>
    );
}