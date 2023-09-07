export const addSession = () => {
    cy.getByDataTestId('os-sessions-tab').click()
    cy.get('div.MuiImageListItemBar-title').contains('no sessions yet').should('exist')
    cy.getByDataTestId('os-session-add-button').click()
    cy.wait('@sessionsApi')
    cy.get('div.MuiImageListItemBar-title').contains('no sessions yet').should('not.exist')
}