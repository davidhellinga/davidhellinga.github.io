describe('Log In', () => {
    it('Successfully log in', function () {
        let mail = "oibss@oibss.com";
        //visit main page
        cy.visit('/');
        //assert location
        cy.url({timeout: 3000}).should('eq', Cypress.config().baseUrl+"/login");

        cy.get("form").within(() => {
            cy.contains("Login").should("exist");
        });
        //enter login data
        cy.get('input[id="email"]').type(mail);
        cy.get('input[id="password"').type("testpass");
        cy.get('button[type="submit"').click();
        //verify redirect
        cy.url({timeout: 3000}).should('eq', Cypress.config().baseUrl+"/");
        //verify cookie
        cy.getCookie('token').should('not.to.be.null')
        //check if ui is updated properly
        cy.contains("Logout").should("exist");
        cy.contains('@ ' + mail).should("exist");
    });

    it('Fails login due to incorrect login info', function () {
        let mail = "incorrect@wrong.ree";
        //visit main page
        cy.visit('/');
        //assert location
        cy.url({timeout: 3000}).should('eq', Cypress.config().baseUrl+"/login");

        cy.get("form").within(() => {
            cy.contains("Login").should("exist");
        });
        //enter login data
        cy.get('input[id="email"]').type(mail);
        cy.get('input[id="password"').type("&&^%%");
        cy.get('button[type="submit"').click();
        //verify redirect
        cy.url({timeout: 3000}).should('eq', Cypress.config().baseUrl+"/login");
        //verify cookie
        cy.getCookie('token').should('to.be.null');

    });

    it('redirects unauthorized users', () => {
        cy.visit('/');
        if (cy.getCookie('token').should('to.be.null')){
            cy.url().should('contains', '/login');
        }
        // go to protected path
        // we should be redirected to login page
    });
});