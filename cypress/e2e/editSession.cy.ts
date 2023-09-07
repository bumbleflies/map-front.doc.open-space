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

    it('adds a new one', () => {
        cy.onTestOs().then((testOsId) => {
            cy.clickImagesView()
            cy.addSession()
        })
    })

    it('edits title and dates', () => {
        cy.onTestOs().then((testOsId) => {
            // add session
            cy.clickImagesView()
            cy.addSession()

            // edit session
            cy.getByDataTestId('os-session-menu').click()
            cy.getByDataTestId('os-session-menu-edit').click()
            cy.getByDataTestId('session-edit-title').type('{selectall}My Test Session')

            // start time
            cy.getByDataTestId('CalendarIcon').click()
            cy.get('button[data-timestamp="1692136800000"]').click()
            cy.get('div.MuiPickersLayout-root').find('button').contains('OK').click()

            // duration
            cy.getByDataTestId('session-edit-duration').type('{selectall}120')

            // save
            cy.getByDataTestId('session-edit-save').click()
            // back to list
            cy.getByDataTestId('os-session-back-button').click()

            cy.get('ul.MuiImageList-root li').eq(1).find('[data-testid=os-session-title-bar]')
                .should('contain.text', 'My Test Session')
            cy.get('ul.MuiImageList-root li').eq(1).find('[data-testid=os-session-time-bar]')
                .should('contain.text', '16.08 19:00 - 21:00')
        })
    })


    it('deletes the session', () => {
        cy.onTestOs().then((testOsId) => {
            cy.clickImagesView()
            cy.getByDataTestId('os-sessions-tab').click()
            cy.get('div.MuiImageListItemBar-title').contains('no sessions yet').should('exist')
            cy.getByDataTestId('os-session-add-button').click()
            cy.get('div.MuiImageListItemBar-title').contains('no sessions yet').should('not.exist')

            cy.getByDataTestId('os-session-menu').click()
            cy.getByDataTestId('os-session-menu-delete').click()

            cy.get('div.MuiImageListItemBar-title').contains('no sessions yet').should('exist')
        })
    })


})

export {}
