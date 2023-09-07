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
            cy.uploadImage('session','cypress/fixtures/test-image.png')
            cy.getByDataTestId('os-session-image').should('exist')
        })
    })
})
