import {createOs, deleteOs} from "../support/apiActions";


describe('Performs a simple run', () => {

    beforeEach(() => {
        cy.registerInterceptRoutes()
        createOs()
        cy.visit('http://localhost:3000/')
        cy.wait('@googlemaps')
        cy.viewport('macbook-16')
    })

    afterEach(() => {
        deleteOs()
    })

    it('creates an open space marker and delete it', () => {
        let osId = 'test'
        cy.clickAddOs()
        cy.clickStatusMessage()
        cy.getByDataTestId('grid-identifier-text').then((grid) => {
            osId = grid.text()
            cy.getByDataTestId("os-title").should("contain.text", "Open Space @")
            cy.getByDataTestId("os-delete-button").click()
            cy.get('div.leaflet-tooltip').contains(osId).should('not.exist')
        })
    })

    it('adds, edits and deletes an image', () => {
        cy.onTestOs().then((testOsId) => {

            cy.assertNoImages()

            // upload image
            cy.clickImagesView()
            cy.uploadImage('impression','cypress/fixtures/test-image.png')
            cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('not.exist')

            // make header
            cy.getByDataTestId('os-image-make-header').click()
            cy.wait('@imageHeaderApi')
            cy.getByDataTestId('os-info-tab').click()
            cy.get('img[alt="no image yet available"]').should('not.exist')
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
        cy.onTestOs().then((testOsId) => {
            cy.clickImagesView()
            cy.uploadImage('impression','cypress/fixtures/test-image.png')
            cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('not.exist')
            cy.getByDataTestId('os-image').click()
            cy.getByDataTestId('os-image-fullscreen').should('exist')
            cy.getByDataTestId('os-image-fullscreen-close-button').click()
            cy.url().should('eq', `http://localhost:3000/os/${testOsId}/i`)
        });
    })

})

export {}
