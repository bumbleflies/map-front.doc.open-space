export const clickImagesBack = () => {
    cy.getByDataTestId('os-images-back-button').click()
    cy.getByDataTestId("os-images-button").should('exist')
}
export const clickImagesView = () => {
    cy.getByDataTestId("os-images-button").click()
    cy.wait('@imagesApi')

}
export const assertNoImages = () => {
    cy.get('img[alt="no image yet available"]').should('exist')
    cy.clickImagesView()
    cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('exist')
    cy.getByDataTestId("os-image-add-button").click()
    cy.getByDataTestId("os-image-add-cancel").click()
    cy.get('div.MuiImageListItemBar-title').contains('no images yet').should('exist')
    cy.clickImagesBack()
}
export const uploadImage = (file: string) => {
    cy.getByDataTestId("os-image-add-button").click()
    cy.getByDataTestId('os-image-upload').selectFile(file, {force: true})
    cy.getByDataTestId(`os-image-add-preview-${file.split('/').pop()?.replaceAll('.', '-')}`).should('exist')
    cy.getByDataTestId("os-image-add-save").click()
    cy.wait('@imagesApi')
}