import ViewportPreset = Cypress.ViewportPreset;

import screenSizes from '../fixtures/screens.json'
import {crudWorkflowSuite} from "./crudWorkflow";
import {Suite} from "mocha";

screenSizes.map(screenSize => {

    return describe(`runs on ${screenSize}`, () => {
        beforeEach(()=>{
            cy.viewport(screenSize as ViewportPreset)
        })
        crudWorkflowSuite()
    })

})

export {}
