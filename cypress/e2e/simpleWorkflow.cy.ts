const getByDataTestid = function (testid: string) {
    return cy.get(`[data-testid=${testid}`)
}

describe('Performs a simple run', () => {
    beforeEach(() => {
        cy.intercept('https://maps.googleapis.com/maps/api/mapsjs/gen_204?csp_test=true').as('googlemaps');
        cy.intercept('http://localhost:5000/os/').as('os')
        cy.intercept('http://localhost:5000/os/*/i/?only_header=True').as('header')
        cy.intercept('http://localhost:5000/os/*/i/').as('images')
        cy.intercept('patch', 'http://localhost:5000/os/*/i/*').as('imageHeader')
        cy.visit('http://localhost:3000/')
        cy.wait('@googlemaps')
        cy.viewport('macbook-16')
    })

    it('creates an open space marker, edit title and delete', () => {
        let osId = 'test'
        getByDataTestid("os-home-fab-add").click()
        cy.wait('@os')
        getByDataTestid("status-message-button").click()
        cy.wait('@header')
        getByDataTestid('grid-identifier-text').then((grid) => {
            osId = grid.text()
            getByDataTestid("os-title").should("contain.text", "Open Space @")
            getByDataTestid("os-edit-button").click()
            getByDataTestid("os-edit-title").should("contain.value", "Open Space")
            getByDataTestid("os-edit-cancel").click()
            cy.get('div.leaflet-tooltip').contains(osId).should('exist')
            getByDataTestid("os-edit-button").click()
            cy.wait('@header')
            getByDataTestid("os-edit-title").clear().type('Open Space Test')
            getByDataTestid("os-edit-save").click()
            getByDataTestid("os-title").should("have.text", "Open Space Test")
            getByDataTestid("os-delete-button").click()
            cy.get('div.leaflet-tooltip').contains(osId).should('not.exist')
        })
    })

    it('creates open space and adds image', () => {
        getByDataTestid("os-home-fab-add").click()
        cy.wait('@os')
        getByDataTestid("status-message-button").click()
        cy.wait('@header')
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

        getByDataTestid('os-images-back-button').click()
        getByDataTestid("os-delete-button").click()
    })

})

export {}
