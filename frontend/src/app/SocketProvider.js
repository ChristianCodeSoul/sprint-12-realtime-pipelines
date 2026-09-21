"use client";
import { useEffect } from "react";
import socket from "../lib/socket";
export default function SocketProvider({
    children,
}) {

    useEffect(() => {
        socket.connect();
        const handleConnect = () => {
            console.log(
                "Socket connected:",
                socket.id
            );
            socket.emit("join-admin-room");
        };

        const handleDisconnect = (reason) => {
            console.log(
                "Socket disconnected:",
                reason
            );
        };

        const handleNewOrder = (data) => {
            console.log("New order received:", data);
        };

        socket.on("connect", handleConnect);
        socket.on(
            "disconnect",
            handleDisconnect
        );
        socket.on(
            "new-order",
            handleNewOrder
        );

        return () => {
            socket.off(
                "connect",
                handleConnect
            );

            socket.off(
                "disconnect",
                handleDisconnect
            );

            socket.off(
                "new-order",
                handleNewOrder
            );
            socket.disconnect();
        };
    }, []);
    return children;
}