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
                    cy.clickAddOs()
                    cy.clickStatusMessage()
                    cy.getByDataTestId("os-title").should("contain.text", "Open Space @")
                    cy.getByDataTestId('grid-identifier-text').then((osIdElement) => {
                        cy.openEditAssertTitle(osIdElement.text(), 'Open Space')
                    })
                    cy.assertNoImages()

                    cy.clickImagesView()
                    cy.uploadImage('cypress/fixtures/test-image.png')

                    cy.getByDataTestId('os-image').click()
                    cy.getByDataTestId('os-image-fullscreen').should('exist')
                    cy.getByDataTestId('os-image-fullscreen-close-button').click()
                    cy.clickImagesBack()


                    cy.getByDataTestId("os-images-button").click()
                    cy.getByDataTestId('os-image-menu').click()
                    cy.getByDataTestId('os-image-delete-menu').click()
                    cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('exist')
                    cy.clickImagesBack()

                    cy.clickDeleteOs()
                })
            })

        })
    })
})

export {}
