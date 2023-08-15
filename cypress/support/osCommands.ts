export const registerInterceptRoutes = () => {
    cy.intercept('https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true').as('googlemaps');
    cy.intercept('http://localhost:5000/os/').as('osApi')
    cy.intercept('http://localhost:5000/os/*/i/?only_header=True').as('headerApi')
    cy.intercept('http://localhost:5000/os/*/i/').as('imagesApi')
    cy.intercept('patch', 'http://localhost:5000/os/*/i/*').as('imageHeaderApi')
}

export const getByDataTestId = function (testid: string) {
    return cy.get(`[data-testid=${testid}`)
}

export const clickAddOs = () => {
    cy.url().should('eq', 'http://localhost:3000/')
    cy.getByDataTestId('os-home-fab-add').click()
    return cy.wait('@osApi').then((interception) => {
        return cy.wrap(interception.request.url.split('/').pop())
    })
}

export const clickStatusMessage = () => {
    cy.url().should('eq', 'http://localhost:3000/')
    cy.getByDataTestId('status-message-button').click()
    cy.wait('@headerApi')
}

export const clickDeleteOs = () => {
    cy.url().then((url: string) => {
        const parts = url.split('/');
        expect(parts.length).to.be.eq(5)
        const osId = parts.pop()
        cy.getByDataTestId("os-delete-button").click()
        cy.get('div.leaflet-tooltip').contains(osId!).should('not.exist')
    })
}


export const openEditAssertTitle = (osTitlePart: string) => {
    cy.getByDataTestId("os-edit-button").click()
    cy.getByDataTestId("os-edit-title").should("contain.value", osTitlePart)
    cy.getByDataTestId("os-edit-cancel").click()

}

