describe("With an logged in user", () => {

    beforeEach(() => {
        cy.registerInterceptRoutes()
        cy.loginToAuth0(Cypress.env('auth0_username'), Cypress.env('auth0_password'))
    });

    afterEach(() => {
    })

    it('the avatar menu is shown', () => {
        cy.getByDataTestId('user-profile-avatar').click()
        cy.getByDataTestId('user-profile-action-menu').should('be.visible')
        cy.getByDataTestId('user-profile-card-header').should('be.visible')
            .find('span').should('have.text', Cypress.env('auth0_username'))
        cy.getByDataTestId('user-profile-edit-button').should('be.visible')
        cy.getByDataTestId('user-profile-logout-button').should('be.visible')
    })

    it('the add os button is active', () => {
        cy.getByDataTestId('os-home-fab-add').should('be.visible')
    })

    it('logs the user out when clicked', () => {
        cy.getByDataTestId('user-profile-avatar').click()
        cy.getByDataTestId('user-profile-logout-button').click()
        cy.getByDataTestId('user-login-button').should('be.visible')
    })

    it.skip('changes the users name',()=> {
        cy.getByDataTestId('user-profile-avatar').click()
        cy.getByDataTestId('user-profile-edit-button').click()
        cy.wait('@authUser')
        // change name
        cy.getByDataTestId('user-profile-edit-name').type('{selectall}Cypress Changed')
        cy.getByDataTestId('user-profile-edit-save').click()
        cy.wait('@authUser')
        cy.getByDataTestId('user-profile-edit-name').should('contain.text','Cypress Changed')
        // test cancel
        cy.getByDataTestId('user-profile-edit-name').type('{selectall}Cypress Changed Again')
        cy.getByDataTestId('user-profile-edit-cancel').click()
        cy.getByDataTestId('user-profile-edit-name').should('contain.text','Cypress Changed')
        // restore user name
        cy.getByDataTestId('user-profile-edit-name').type('{selectall}Cypress Test User')
        cy.getByDataTestId('user-profile-edit-save').click()

    })

})

describe("With an logged out user", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it('the avatar menu is login', () => {
        cy.getByDataTestId('user-login-button').should('be.visible')
    })

    it('the add os button is active', () => {
        cy.getByDataTestId('os-home-fab-add-disabled').should('be.visible')
    })
})

export {}