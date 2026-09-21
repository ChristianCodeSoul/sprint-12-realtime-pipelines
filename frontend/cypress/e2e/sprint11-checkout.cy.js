describe("Sprint 12 Checkout Flow", () => {
    it("completes a purchase from products to order confirmation", () => {
        cy.visit("http://localhost:3000/products");
        cy.contains("Products").should("be.visible");
        cy.get("a.product-card")
            .first()
            .click();
        cy.url().should("match", /\/products\/.+/);
        cy.contains("Add to Cart")
            .should("be.visible")
            .click();
        cy.contains("Cart")
            .should("be.visible")
            .click();
        cy.url().should("include", "/cart");
        cy.contains("Your Cart").should("be.visible");
        cy.contains("Checkout")
            .click();
        cy.url().should("include", "/checkout");
        cy.contains("Complete Your Order")
            .should("be.visible");
        cy.get("#name")
            .type("Cypress Test User");
        cy.get("#email")
            .type("cypress-test@example.com");
        cy.contains("Place Order")
            .click();
        cy.contains("Order placed successfully.")
            .should("be.visible");
    });
});