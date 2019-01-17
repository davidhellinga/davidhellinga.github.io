describe("Log out", () => {
    it('Successfully log out', function () {
        let email = "oibss@oibss.com";
        let password = "testpass";
        //Login
        cy.login(email, password);
        //Check if on dashboard
        cy.url().should('eq', Cypress.config().baseUrl + "/");
        //Click logout button
        cy.contains("Logout").click();
        //verify logout
        cy.url({timeout: 3000}).should('eq', Cypress.config().baseUrl + "/login");
        cy.getCookie("token").should('to.be.null');
    });
});