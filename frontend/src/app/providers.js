"use client";
import { Provider } from "react-redux";
import { store } from "../store/store";

import dynamic from "next/dynamic";

const SocketProvider = dynamic(() => import("./SocketProvider"), {
    ssr: false,
});

export default function Providers({
    children,
}) {
    return (
        <Provider store={store}>
            <SocketProvider>
                {children}
            </SocketProvider>
        </Provider>
    );
}