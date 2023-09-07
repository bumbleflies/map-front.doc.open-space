import {createOs, deleteOs} from "../support/apiActions";

describe('when adding os sessions', () => {
    beforeEach(async () => {
        cy.registerInterceptRoutes()
        await createOs()
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
            cy.uploadImage('cypress/fixtures/test-image.png')

        })
    })
})
