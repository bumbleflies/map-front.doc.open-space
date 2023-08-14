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
    assertNoImages,
    clickAddOs,
    clickDeleteOs,
    clickStatusMessage,
    getByDataTestId,
    openEditAssertTitle,
    registerInterceptRoutes
} from "./osCommands";

Cypress.Commands.addAll({
    registerInterceptRoutes,
    getByDataTestId,
    clickAddOs,
    clickStatusMessage,
    clickDeleteOs,
    openEditAssertTitle,
    assertNoImages
})

declare global {
    namespace Cypress {
        interface Chainable {
            registerInterceptRoutes(): Chainable<void>

            getByDataTestId(dataTestId: string): Chainable<JQuery<HTMLElement>>

            clickAddOs(): Chainable<string>

            clickStatusMessage(): Chainable<void>

            clickDeleteOs(): Chainable<void>

            openEditAssertTitle(osTitlePart: string): Chainable<void>

            assertNoImages(): Chainable<void>

//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
        }
    }
}
export {}
