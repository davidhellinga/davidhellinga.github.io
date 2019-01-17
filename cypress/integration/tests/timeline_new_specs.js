describe("Create new timeline", ()=>{
    it('Successfully create new timeline', function () {
        let email = "oibss@oibss.com";
        let password = "testpass";
        const uuidv1 = require('uuid/v1');
        let id=uuidv1().toString();
        //Login
        cy.login(email, password);
        //Check if on dashboard
        cy.url().should('eq', Cypress.config().baseUrl + "/");

        cy.contains("Create new timeline").should('be.disabled');
        cy.get('input[id="name"]').type("Anno Domini "+id);
        cy.contains("Create new timeline").click();
        cy.wait(2000);
        cy.reload();
        cy.contains(id).should('exist');

    });
});