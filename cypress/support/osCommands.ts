export const registerInterceptRoutes = () => {
    cy.intercept('https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true').as('googlemaps');
    cy.intercept('https://maps.googleapis.com/maps-api-v3/api/js/54/7a/intl/en_gb/controls.js').as('mapLoaded')
    cy.intercept('http://localhost:5000/os/').as('osApi')
    cy.intercept('http://localhost:5000/os/*?with_header_images=true').as('headerApi')
    cy.intercept('http://localhost:5000/os/*/i/').as('imagesApi')
    cy.intercept('http://localhost:5000/os/*/s/*/i').as('imagesApi')
    cy.intercept('patch', 'http://localhost:5000/os/*/i/*').as('imageHeaderApi')
    cy.intercept('patch', 'http://localhost:5000/os/*/s/*/i/*').as('imageHeaderApi')
    cy.intercept('http://localhost:5000/os/*/s/').as('sessionsApi')
    cy.intercept(`https://${Cypress.env('auth0_domain')}/oauth/token`,).as('oauthToken')
    cy.intercept(`https://${Cypress.env('auth0_domain')}/api/v2/users/*`, {
        "email": "christian.daehn+cypresstest@bumbleflies.de",
        "identities": [
            {
                "connection": "email",
                "provider": "email",
                "user_id": "65141fac0db0b1066edb7a1f",
                "isSocial": false
            }
        ],
        "picture": "https://s.gravatar.com/avatar/7145c2e762d7c7ffb2c2f2aa8b8c44d9?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fch.png",
        "user_id": "email|65141fac0db0b1066edb7a1f",
        "user_metadata": {
            "name": "Cypress Test User1"
        },
    }).as('authUser')
}

export const getByDataTestId = function (testid: string) {
    return cy.get(`[data-testid=${testid}`)
}

export const clickAddOs = () => {
    cy.url().should('eq', 'http://localhost:3000/')
    cy.getByDataTestId('os-home-fab-add').click()
    cy.wait('@oauthToken')
    return cy.wait('@osApi')
}

export const clickStatusMessage = () => {
    cy.url().should('eq', 'http://localhost:3000/')
    cy.getByDataTestId('status-message-button').click()
    cy.wait('@headerApi')
}

export const clickDeleteOs = () => {
    cy.url().then((url: string) => {
        const parts = url.endsWith('/') ? url.slice(0, -1).split('/') : url.split('/')
        expect(parts.length).to.be.eq(6)
        const osId = parts.pop()
        cy.getByDataTestId("os-delete-button").click()
        cy.getByDataTestId('confirm-dialog-confirm-dialog').click()
        cy.get('div.leaflet-tooltip').contains(osId!).should('not.exist')
    })
}

export const openOsEdit = (osId: string) => {
    cy.url().should('eq', `http://localhost:3000/os/${osId}/d`)
    cy.getByDataTestId("os-edit-button").click()
}

export const openEditAssertTitle = (osId: string, osTitlePart: string) => {
    cy.openOsEdit(osId)
    cy.getByDataTestId("os-edit-title").should("contain.value", osTitlePart)
    cy.getByDataTestId("os-edit-cancel").click()

}

export const onTestOs = () =>
    cy.get('@testOsId').then((testOsId) => {
        cy.visit(`http://localhost:3000/os/${testOsId}/d`)
        return cy.wrap(testOsId)
    })

