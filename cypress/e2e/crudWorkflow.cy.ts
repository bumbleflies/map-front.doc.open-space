import axios from "axios";

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
        cy.registerInterceptRoutes()
        await createOs()
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

    it('edits the title', () => {
        onTestOs().then((testOsId) => {
            cy.openEditAssertTitle('Open Space')
            cy.get('div.leaflet-tooltip').contains(testOsId as unknown as string).should('exist')
            cy.getByDataTestId("os-edit-button").click()
            cy.wait('@headerApi')
            cy.getByDataTestId("os-edit-title").type('{selectall}Open Space Test')
            cy.getByDataTestId("os-edit-save").click()
            cy.getByDataTestId("os-title").should("have.text", "Open Space Test")
        })
    })

    it('adds, edits and deletes an image', () => {
        onTestOs().then((testOsId) => {

            cy.assertNoImages()

            // upload image
            cy.clickImagesView()
            cy.getByDataTestId("os-image-add-button").click()
            cy.getByDataTestId('os-image-upload').selectFile('cypress/fixtures/test-image.png', {force: true})
            cy.getByDataTestId('os-image-add-preview-test-image\\.png').should('exist')
            cy.getByDataTestId("os-image-add-save").click()
            cy.wait('@imagesApi')
            cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('not.exist')

            // make header
            cy.getByDataTestId('os-image-menu').click()
            cy.getByDataTestId('os-image-make-header-menu').click()
            cy.wait('@imageHeaderApi')
            cy.getByDataTestId('os-images-back-button').click()
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

})

export {}
