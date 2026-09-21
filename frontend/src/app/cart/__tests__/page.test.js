import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/slices/cartSlice";
import CartPage from "../page";
jest.mock("next/image", () => ({
    __esModule: true,
    default: (props) => <img {...props} />,
}));
jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ children, ...props }) => (
        <a {...props}>{children}</a>
    ),
}));
const product = {
    productId: "product-1",
    title: "Test Product",
    price: 100,
    image: "/test.jpg",
    quantity: 1,
};
function renderCart() {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
        },
        preloadedState: {
            cart: {
                items: [product],
            },
        },
    });
    render(
        <Provider store={store}>
            <CartPage />
        </Provider>
    );
    return store;
}
describe("CartPage", () => {
    test("increases product quantity when + button is clicked", async () => {
        renderCart();
        const user = userEvent.setup();
        const cartItem = screen.getByRole("article");
        expect(
            within(cartItem).getByText("1")
        ).toBeInTheDocument();
        await user.click(
            within(cartItem).getByRole("button", {
                name: "+",
            })
        );
        expect(
            within(cartItem).getByText("2")
        ).toBeInTheDocument();
    });
    test("removes product when Remove button is clicked", async () => {
        renderCart();

        const user = userEvent.setup();
        const cartItem = screen.getByRole("article");
        expect(
            screen.getByText("Test Product")
        ).toBeInTheDocument();
        await user.click(
            within(cartItem).getByRole("button", {
                name: "Remove",
            })
        );
        expect(
            screen.getByText("Nothing here yet.")
        ).toBeInTheDocument();
    });
});