import ViewportPreset = Cypress.ViewportPreset;

import screenSizes from '../fixtures/screens.json'

describe('clicks through on different viewports', () => {
    before(() => {
        cy.registerInterceptRoutes()
    })

    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.wait('@googlemaps')
    })

    screenSizes.forEach(screenSize  => {
        it(`runs on ${screenSize}`, () => {
            cy.viewport(screenSize as ViewportPreset)
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

export {}
