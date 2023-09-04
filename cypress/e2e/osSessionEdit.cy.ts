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

    it('adds a new one', () => {
        cy.onTestOs().then((testOsId) => {
            cy.clickImagesView()
            cy.getByDataTestId('os-sessions-tab').click()
            cy.get('div.MuiImageListItemBar-title').contains('no sessions yet').should('exist')
            cy.getByDataTestId('os-session-add-button').click()
            cy.get('div.MuiImageListItemBar-title').contains('no sessions yet').should('not.exist')
        })
    })

    it('edits title and dates', () => {
        cy.onTestOs().then((testOsId) => {
            // add session
            cy.clickImagesView()
            cy.getByDataTestId('os-sessions-tab').click()
            cy.get('div.MuiImageListItemBar-title').contains('no sessions yet').should('exist')
            cy.getByDataTestId('os-session-add-button').click()
            cy.wait('@sessionsApi')

            // edit session
            cy.getByDataTestId('os-session-edit').click()
            cy.getByDataTestId('session-edit-title').type('{selectall}My Test Session')

            // start time
            cy.getByDataTestId('CalendarIcon').click()
            cy.get('button[data-timestamp="1692136800000"]').click()
            cy.get('div.MuiPickersLayout-root').find('button').contains('OK').click()

            // duration
            cy.getByDataTestId('session-edit-duration').type('{selectall}120')

            // save
            cy.getByDataTestId('session-edit-save').click()

        })
    })

})

export {}
