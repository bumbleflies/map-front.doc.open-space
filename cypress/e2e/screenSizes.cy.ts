import ViewportPreset = Cypress.ViewportPreset;

describe('clicks through on different viewports', () => {
    before(() => {
        cy.registerInterceptRoutes()
    })

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.wait('@googlemaps')
    })

    it('should do the same on every screen', () => {

        cy.fixture('screens').then((viewports: ViewportPreset[]) => {
            viewports.forEach((viewport) => {
                describe(`runs in ${viewport} view`, () => {
                    cy.viewport(viewport)
                    cy.clickAddOs().as('osId')
                    cy.clickStatusMessage()
                    cy.getByDataTestId("os-title").should("contain.text", "Open Space @")
                    cy.openEditAssertTitle('Open Space')
                    cy.assertNoImages()
                    cy.clickDeleteOs()
                })
            })

        })
    })
})

export {}
