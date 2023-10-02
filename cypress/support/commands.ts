/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import {
    clickAddOs,
    clickDeleteOs,
    clickStatusMessage,
    getByDataTestId,
    onTestOs,
    openEditAssertTitle,
    openOsEdit,
    registerInterceptRoutes
} from "./osCommands";
import {assertNoImages, clickImagesBack, clickImagesView, uploadImage} from "./imageCommands";
import {addSession} from "./sessionCommands";
import {changeUserName, gotoProfilePage, loginToAuth0} from "./auth0Commands";

Cypress.Commands.addAll({
    registerInterceptRoutes,
    getByDataTestId,
    clickAddOs,
    clickStatusMessage,
    clickDeleteOs,
    openEditAssertTitle,
    assertNoImages,
    clickImagesBack,
    clickImagesView,
    uploadImage,
    onTestOs,
    openOsEdit,
    addSession,
    loginToAuth0,
    gotoProfilePage,
    changeUserName
})

declare global {
    namespace Cypress {
        interface Chainable {
            registerInterceptRoutes(): Chainable<void>

            getByDataTestId(dataTestId: string): Chainable<JQuery<HTMLElement>>

            clickAddOs(): Chainable<void>

            clickStatusMessage(): Chainable<void>

            clickDeleteOs(): Chainable<void>

            openEditAssertTitle(osId: string, osTitlePart: string): Chainable<void>

            assertNoImages(): Chainable<void>

            clickImagesBack(): Chainable<void>

            clickImagesView(): Chainable<void>

            uploadImage(component:"impression"|"session", file: string): Chainable<void>

            onTestOs(): Chainable<string>

            openOsEdit(osId: string): Chainable<void>

            addSession(): Chainable<void>

            loginToAuth0(username: string, password: string): Chainable<void>

            gotoProfilePage(): Chainable<void>

            changeUserName(username: string): Chainable<string>

//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
        }
    }
}
export {}
