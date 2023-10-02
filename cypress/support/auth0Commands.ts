const loginViaAuth0Ui = (username: string, password: string) => {
    // App landing page redirects to Auth0.
    cy.visit('http://localhost:3000/?logintype=usernamepassword')

    cy.getByDataTestId('user-login-button').click()

    // Login on Auth0.
    cy.origin(
        Cypress.env('auth0_domain'),
        {args: {username, password}},
        ({username, password}) => {
            cy.get('input#username').type(username)
            cy.contains('button[value=default]', 'Continue').click()
            cy.get('input#password').type(password, {log: false})
            cy.contains('button._button-login-password', 'Continue').click()
        }
    )
    cy.getByDataTestId('user-profile-avatar').should('exist')
    // Ensure Auth0 has redirected us back to the RWA.
    cy.url().should('contain', 'http://localhost:3000/')
}

export const loginToAuth0 = (username: string, password: string) => {
    const log = Cypress.log({
        displayName: 'AUTH0 LOGIN',
        message: [`🔐 Authenticating | ${username}`],
        // @ts-ignore
        autoEnd: false,
    })
    log.snapshot('before')

    loginViaAuth0Ui(username, password)

    log.snapshot('after')
    log.end()
}

export const gotoProfilePage = () => {
    cy.getByDataTestId('user-profile-avatar').click()
    cy.getByDataTestId('user-profile-edit-button').click()
    cy.wait('@authUser')
    cy.url().should('eq', 'http://localhost:3000/u/me')
}

export const changeUserName = (username: string) => {
    cy.getByDataTestId('user-profile-edit-name').type(`{selectall}${username}`)
    cy.getByDataTestId('user-profile-edit-save').click()
    cy.wait('@authUser')
}

export {}
