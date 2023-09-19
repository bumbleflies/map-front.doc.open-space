describe("With an logged in user", () => {

    beforeEach(() => {
        cy.loginToAuth0(Cypress.env('auth0_username'), 'aaAA12%$12a')
    });

    afterEach(() => {
    })

    it('the avatar menu is shown', () => {
        cy.getByDataTestId('user-profile-avatar').should('exist').click()
        cy.getByDataTestId('user-profile-action-menu').should('be.visible')
        cy.getByDataTestId('user-profile-card-header').should('be.visible')
            .find('span').should('have.text', Cypress.env('auth0_username'))
        cy.getByDataTestId('user-profile-edit-button').should('be.visible')
        cy.getByDataTestId('user-profile-logout-button').should('be.visible')
    })

    it('the avatar menu is login, when logged out', () => {
        cy.getByDataTestId('user-profile-avatar').should('exist').click()
        cy.getByDataTestId('user-profile-logout-button').click()
        cy.getByDataTestId('user-login-button').should('be.visible')
    })
})

export {}