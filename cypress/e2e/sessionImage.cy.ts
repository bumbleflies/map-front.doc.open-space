import {createOs, deleteOs} from "../support/apiActions";

describe('when adding os sessions', () => {
    beforeEach(() => {
        cy.registerInterceptRoutes()
        createOs()
        cy.visit('http://localhost:3000/')
        cy.wait('@googlemaps')
        cy.viewport('macbook-16')
    })

    afterEach(() => {
        deleteOs()
        cy.visit('http://localhost:3000/') // to prevent error after delete
    })

    it('adds a new image', () => {
        cy.onTestOs().then((testOsId) => {
            cy.clickImagesView()
            cy.addSession()
            // goto session
            cy.getByDataTestId('os-session').click()
            cy.getByDataTestId('os-session-image').should('not.exist')
            // upload image
            cy.uploadImage('session','cypress/fixtures/test-image.png')
            cy.getByDataTestId('os-session-image').should('exist')
        })
    })

    it('deletes an image', ()=> {
        cy.onTestOs().then((testOsId) => {
            cy.clickImagesView()
            cy.addSession()
            // goto session
            cy.getByDataTestId('os-session').click()
            cy.getByDataTestId('os-session-image').should('not.exist')
            // upload image
            cy.uploadImage('session','cypress/fixtures/test-image.png')
            cy.getByDataTestId('os-session-image').should('exist')

            // delete image
            cy.getByDataTestId('os-session-image-delete').click()
            cy.wait('@imagesApi')
            cy.getByDataTestId('os-session-image').should('not.exist')
        })
    })

    it('shows image in full screen', ()=>{
        cy.onTestOs().then((testOsId) => {
            cy.clickImagesView()
            cy.addSession()
            // goto session
            cy.getByDataTestId('os-session').click()
            cy.getByDataTestId('os-session-image').should('not.exist')
            // upload image
            cy.uploadImage('session', 'cypress/fixtures/test-image.png')
            cy.getByDataTestId('os-session-image').should('exist')
            // view in fullscreen
            cy.getByDataTestId('os-image').click()
            cy.getByDataTestId('os-image-fullscreen').should('exist')
            cy.getByDataTestId('os-image-fullscreen-close-button').click()
        })
    })
})
