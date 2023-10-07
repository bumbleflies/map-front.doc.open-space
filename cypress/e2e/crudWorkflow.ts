import {createOs, deleteOs, login} from "../support/apiActions";


export const crudWorkflowSuite = () => {
    describe('Performs a simple run', () => {

        beforeEach(() => {
            cy.registerInterceptRoutes()
            login()
            cy.get('@bearerToken').then(bearerToken => createOs(bearerToken as unknown as string))
            cy.visit('http://localhost:3000/')
            cy.wait('@googlemaps')
        })

        afterEach(() => {
            cy.get('@bearerToken').then(bearerToken => deleteOs(bearerToken as unknown as string))
        })

        it('navigates home page', () => {
            cy.onTestOs().then((testOsId) => {
                cy.getByDataTestId('navigate-home').click()
                cy.url().should('eq', 'http://localhost:3000/')
            })
        })

        it('creates an open space marker and delete it', () => {
            cy.loginToAuth0(Cypress.env('auth0_username'), Cypress.env('auth0_password'))
            cy.clickAddOs()
            cy.clickStatusMessage()
            cy.getByDataTestId('grid-identifier-text').then((grid) => {
                const osId = grid.text()
                cy.getByDataTestId("os-title").should("contain.text", "Open Space @")
                cy.getByDataTestId("grid-identifier-text").should("contain.text", osId)
                cy.clickDeleteOs()
            })
        })

        it('adds, edits and deletes an image', () => {
            cy.loginToAuth0(Cypress.env('auth0_username'), Cypress.env('auth0_password'))
            cy.getByDataTestId("user-profile-avatar").should("exist")
            cy.onTestOs().then((testOsId) => {

                cy.assertNoImages()

                // upload image
                cy.clickImagesView()
                cy.uploadImage('impression', 'cypress/fixtures/test-image.png')
                cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('not.exist')

                // make header
                cy.getByDataTestId('os-image-make-header').click()
                cy.wait('@imageHeaderApi')
                cy.getByDataTestId('header-active').should('exist')
                cy.getByDataTestId('os-info-tab').click()
                cy.get('img[alt="no image available yet"]').should('not.exist')
                cy.getByDataTestId('os-images-button').find('img').should('have.attr', 'alt').should('contain', 'Image ')

                // edit image
                cy.getByDataTestId("os-images-button").click()
                cy.getByDataTestId('os-image-menu').click()
                cy.getByDataTestId('os-image-edit-menu').click()
                cy.getByDataTestId('image-edit-description').clear().type('test description')
                cy.getByDataTestId('image-edit-save').click()
                cy.get('div.MuiImageListItemBar-title').contains('test description').should('exist')
                cy.clickImagesBack()

                // delete image
                cy.getByDataTestId("os-images-button").click()
                cy.getByDataTestId('os-image-menu').click()
                cy.getByDataTestId('os-image-delete-menu').click()
                cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('exist')
            })
        })

        it('views the image in fullscreen', () => {
            cy.loginToAuth0(Cypress.env('auth0_username'), Cypress.env('auth0_password'))
            cy.onTestOs().then((testOsId) => {
                cy.clickImagesView()
                cy.uploadImage('impression', 'cypress/fixtures/test-image.png')
                cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('not.exist')
                cy.getByDataTestId('os-image').click()
                cy.getByDataTestId('os-image-fullscreen').should('exist')
                cy.getByDataTestId('os-image-fullscreen-close-button').click()
                cy.url().should('eq', `http://localhost:3000/os/${testOsId}/i`)
            });
        })

    })
}

