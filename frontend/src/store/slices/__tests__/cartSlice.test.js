import cartReducer, {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
} from "../cartSlice";
const product = {
    _id: "product-1",
    title: "Test Product",
    price: 100,
    image: "test.jpg",
};
describe("cartSlice", () => {
    test("adds a new product with quantity 1", () => {
        const initialState = {
            items: [],
        };
        const state = cartReducer(initialState, addToCart(product));
        expect(state.items).toHaveLength(1);
        expect(state.items[0].productId).toBe("product-1");
        expect(state.items[0].quantity).toBe(1);
    });
    test("increases quantity when the same product is added again", () => {
        const initialState = {
            items: [
                {
                    productId: "product-1",
                    title: "Test Product",
                    price: 100,
                    image: "test.jpg",
                    quantity: 1,
                },
            ],
        };
        const state = cartReducer(initialState, addToCart(product));
        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(2);
    });
    test("increases product quantity", () => {
        const initialState = {
            items: [
                {
                    productId: "product-1",
                    title: "Test Product",
                    price: 100,
                    image: "test.jpg",
                    quantity: 1,
                },
            ],
        };
        const state = cartReducer(
            initialState,
            increaseQuantity("product-1")
        );
        expect(state.items[0].quantity).toBe(2);
    });
    test("decreases product quantity", () => {
        const initialState = {
            items: [
                {
                    productId: "product-1",
                    title: "Test Product",
                    price: 100,
                    image: "test.jpg",
                    quantity: 2,
                },
            ],
        };
        const state = cartReducer(
            initialState,
            decreaseQuantity("product-1")
        );
        expect(state.items[0].quantity).toBe(1);
    });
    test("removes product when quantity reaches 1 and decrease is clicked", () => {
        const initialState = {
            items: [
                {
                    productId: "product-1",
                    title: "Test Product",
                    price: 100,
                    image: "test.jpg",
                    quantity: 1,
                },
            ],
        };
        const state = cartReducer(
            initialState,
            decreaseQuantity("product-1")
        );
        expect(state.items).toHaveLength(0);
    });
    test("removes a product from the cart", () => {
        const initialState = {
            items: [
                {
                    productId: "product-1",
                    title: "Test Product",
                    price: 100,
                    image: "test.jpg",
                    quantity: 1,
                },
            ],
        };
        const state = cartReducer(
            initialState,
            removeFromCart("product-1")
        );
        expect(state.items).toHaveLength(0);
    });
    test("clears the entire cart", () => {
        const initialState = {
            items: [
                {
                    productId: "product-1",
                    title: "Test Product",
                    price: 100,
                    image: "test.jpg",
                    quantity: 2,
                },
            ],
        };
        const state = cartReducer(initialState, clearCart());
        expect(state.items).toHaveLength(0);
    });
    it("does nothing when decreasing a product that is not in the cart", () => {
        const state = {
            items: [
                {
                    productId: "1",
                    title: "Headphones",
                    price: 100,
                    quantity: 2,
                },
            ],
        };
        const result = cartReducer(
            state,
            decreaseQuantity("999")
        );
        expect(result.items).toHaveLength(1);
        expect(result.items[0].productId).toBe("1");
        expect(result.items[0].quantity).toBe(2);
    });
});