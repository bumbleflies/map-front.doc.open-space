import axios from "axios";

const getByDataTestid = function (testid: string) {
    return cy.get(`[data-testid=${testid}`)
}

const createOs = () => {
    return axios.post('http://localhost:5000/os', {
        "location": {
            "lat": 1.01,
            "lng": 2.02
        },
        "title": "[Test-123] Open Space",
        "start_date": "2023-08-14T17:00:00.000Z",
        "end_date": "2023-08-14T19:00:00.000Z"
    }).then((result) => {
        cy.wrap(result.data.identifier).as('testOsId')
    })
}

const deleteOs = () => {
    cy.get('@testOsId').then((testId) => {
        return axios.delete(`http://localhost:5000/os/${testId}`)
    })
}

const onTestOs = () => {
    return cy.get('@testOsId').then((testOsId) => {
        cy.visit(`http://localhost:3000/os/${testOsId}`)
        return cy.wrap(testOsId)
    })
}

describe('Performs a simple run', () => {

    beforeEach(async () => {
        await createOs()
        cy.intercept('https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true').as('googlemaps');
        cy.intercept('http://localhost:5000/os/').as('os')
        cy.intercept('http://localhost:5000/os/*/i/?only_header=True').as('header')
        cy.intercept('http://localhost:5000/os/*/i/').as('images')
        cy.intercept('patch', 'http://localhost:5000/os/*/i/*').as('imageHeader')
        cy.visit('http://localhost:3000/')
        cy.wait('@googlemaps')
        cy.viewport('macbook-16')
    })

    afterEach(() => {
        deleteOs()
    })

    it('edits the title', () => {
        onTestOs().then((testOsId) => {
            getByDataTestid("os-edit-button").click()
            getByDataTestid("os-edit-title").should("contain.value", "Open Space")
            getByDataTestid("os-edit-cancel").click()
            cy.get('div.leaflet-tooltip').contains(testOsId as unknown as string).should('exist')
            getByDataTestid("os-edit-button").click()
            cy.wait('@header')
            getByDataTestid("os-edit-title").type('{selectall}Open Space Test')
            getByDataTestid("os-edit-save").click()
            getByDataTestid("os-title").should("have.text", "Open Space Test")
        })
    })

    it('creates an open space marker and delete it', () => {
        let osId = 'test'
        getByDataTestid("os-home-fab-add").click()
        cy.wait('@os')
        getByDataTestid("status-message-button").click()
        cy.wait('@header')
        getByDataTestid('grid-identifier-text').then((grid) => {
            osId = grid.text()
            getByDataTestid("os-title").should("contain.text", "Open Space @")
            getByDataTestid("os-delete-button").click()
            cy.get('div.leaflet-tooltip').contains(osId).should('not.exist')
        })
    })

    it('adds an image', () => {
        onTestOs().then((testOsId) => {

            cy.get('img[alt="no image yet available"]').should('exist')

            // goto images page
            getByDataTestid("os-images-button").click()
            cy.wait('@images')
            cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('exist')
            getByDataTestid("os-image-add-button").click()
            getByDataTestid("os-image-add-cancel").click()
            cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('exist')

            // upload image
            getByDataTestid("os-image-add-button").click()
            getByDataTestid('os-image-upload').selectFile('cypress/fixtures/test-image.png', {force: true})
            getByDataTestid('os-image-add-preview-test-image\\.png').should('exist')
            getByDataTestid("os-image-add-save").click()
            cy.wait('@images')
            cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('not.exist')

            // make header
            getByDataTestid('os-image-menu').click()
            getByDataTestid('os-image-make-header-menu').click()
            cy.wait('@imageHeader')
            getByDataTestid('os-images-back-button').click()
            cy.get('img[alt="no image yet available"]').should('not.exist')
            getByDataTestid('os-images-button').find('img').should('have.attr', 'alt').should('contain', 'Image ')

            // edit image
            getByDataTestid("os-images-button").click()
            getByDataTestid('os-image-menu').click()
            getByDataTestid('os-image-edit-menu').click()
            getByDataTestid('image-edit-description').clear().type('test description')
            getByDataTestid('image-edit-save').click()
            cy.get('div.MuiImageListItemBar-title').contains('test description').should('exist')
            getByDataTestid('os-images-back-button').click()

            // delete image
            getByDataTestid("os-images-button").click()
            getByDataTestid('os-image-menu').click()
            getByDataTestid('os-image-delete-menu').click()
            cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('exist')
        })
    })

})

export {}
