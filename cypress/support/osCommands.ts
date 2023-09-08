export const registerInterceptRoutes = () => {
    cy.intercept('https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true').as('googlemaps');
    cy.intercept('http://localhost:5000/os/').as('osApi')
    cy.intercept('http://localhost:5000/os/*/i/?only_header=True').as('headerApi')
    cy.intercept('http://localhost:5000/os/*/i/').as('imagesApi')
    cy.intercept('http://localhost:5000/os/*/s/*/i').as('imagesApi')
    cy.intercept('patch', 'http://localhost:5000/os/*/i/*').as('imageHeaderApi')
    cy.intercept('patch', 'http://localhost:5000/os/*/s/*/i/*').as('imageHeaderApi')
    cy.intercept('http://localhost:5000/os/*/s/').as('sessionsApi')
}

export const getByDataTestId = function (testid: string) {
    return cy.get(`[data-testid=${testid}`)
}

export const clickAddOs = () => {
    cy.url().should('eq', 'http://localhost:3000/')
    cy.getByDataTestId('os-home-fab-add').click()
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
        expect(parts.length).to.be.eq(5)
        const osId = parts.pop()
        cy.getByDataTestId("os-delete-button").click()
        cy.get('div.leaflet-tooltip').contains(osId!).should('not.exist')
    })
}

export const openOsEdit = (osId: string) => {
    cy.url().should('eq', `http://localhost:3000/os/${osId}`)
    cy.getByDataTestId("os-edit-button").click()
    cy.wait('@headerApi')
}

export const openEditAssertTitle = (osId: string, osTitlePart: string) => {
    cy.openOsEdit(osId)
    cy.getByDataTestId("os-edit-title").should("contain.value", osTitlePart)
    cy.getByDataTestId("os-edit-cancel").click()

}

export const onTestOs = () =>
    cy.get('@testOsId').then((testOsId) => {
        cy.visit(`http://localhost:3000/os/${testOsId}`)
        return cy.wrap(testOsId)
    })

