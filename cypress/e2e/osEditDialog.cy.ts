import {createOs, deleteOs} from "../support/apiActions";

describe('when editing an open space', () => {
    beforeEach(() => {
        cy.registerInterceptRoutes()
        createOs()
        cy.visit('http://localhost:3000/')
        cy.wait('@googlemaps')
        cy.viewport('macbook-16')
        cy.loginToAuth0(Cypress.env('auth0_username'), Cypress.env('auth0_password'))
    })

    afterEach(() => {
        deleteOs()
        cy.visit('http://localhost:3000/') // to prevent error after delete
    })

    it('edits the title', () => {
        cy.onTestOs().then((testOsId) => {
            cy.openEditAssertTitle(testOsId, 'Open Space')
            cy.get('div.leaflet-tooltip').contains('Open Space').should('exist')
            cy.openOsEdit(testOsId)
            cy.getByDataTestId("os-edit-title").type('{selectall}Open Space Test')
            cy.getByDataTestId("os-edit-save").click()
            cy.getByDataTestId("os-title").should("have.text", "Open Space Test")
        })
    })

    it('sets the end date, when start date is after end date', () => {
        cy.onTestOs().then((testOsId) => {
            cy.openOsEdit(testOsId)
            cy.getByDataTestId('os-date-start').find('button').click()
            cy.get('button[data-timestamp="1692136800000"]').click()
            cy.get('div.MuiPickersLayout-root').find('button').contains('OK').click()
            cy.getByDataTestId('os-date-start').find('input').should('have.value', '16.08.2023 19:00')
            cy.getByDataTestId('os-date-end').find('input').should('have.value', '16.08.2023 21:00')
        })
    })

    it('sets the start date, when end date is before start date', () => {
        cy.onTestOs().then((testOsId) => {
            cy.openOsEdit(testOsId)
            cy.getByDataTestId('os-date-end').find('button').click()
            cy.get('button[data-timestamp="1691964000000"]').click()
            cy.get('div.MuiPickersLayout-root').find('button').contains('OK').click()
            cy.getByDataTestId('os-date-end').find('input').should('have.value', '14.08.2023 21:00')
            cy.getByDataTestId('os-date-start').find('input').should('have.value', '14.08.2023 19:00')
        })
    })

    it('saves the dates when entered directly', () => {
        cy.onTestOs().then((testOsId) => {
            cy.openOsEdit(testOsId)
            cy.getByDataTestId('os-date-end').find('input').type('1408{rightArrow}1400')
            cy.getByDataTestId('os-date-start').find('input').type('1408{rightArrow}11:00')
            cy.getByDataTestId("os-edit-save").click()
            cy.getByDataTestId('grid-start\\ date-text').should('have.text', '14.08.2023 - 11:00')
            cy.getByDataTestId('grid-end\\ date-text').should('have.text', '14.08.2023 - 14:00')
        })
    })

    it('saves the dates when selected in dialog', () => {
        cy.onTestOs().then((testOsId) => {
            cy.openOsEdit(testOsId)
            cy.getByDataTestId('os-date-start').find('button').click()
            cy.get('button[data-timestamp="1691964000000"]').click()
            cy.get('div.MuiPickersLayout-root').find('button').contains('OK').click()
            // wait for dialog to close
            cy.get('div.MuiPickersLayout-root').should('not.exist')

            cy.getByDataTestId('os-date-end').find('button').click()
            cy.get('button[data-timestamp="1692136800000"]').click()
            cy.get('div.MuiPickersLayout-root').find('button').contains('OK').click()

            cy.getByDataTestId("os-edit-save").click()
            cy.getByDataTestId('grid-start\\ date-text').should('have.text', '14.08.2023 - 19:00')
            cy.getByDataTestId('grid-end\\ date-text').should('have.text', '16.08.2023 - 21:00')
        })
    })


    it('updates the place', () => {
        cy.onTestOs().then((testOsId) => {
            cy.openOsEdit(testOsId)
            cy.getByDataTestId('os-location-place').type('{selectall}Test Location')
            cy.get('.MuiAutocomplete-listbox').get('li').eq(1).click()
            cy.getByDataTestId("os-edit-save").click()
            cy.getByDataTestId('grid-position-text').should('have.text', 'Test Location')
        })
    })

})

export {}
