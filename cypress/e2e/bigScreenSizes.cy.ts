import ViewportPreset = Cypress.ViewportPreset;

import screenSizes from '../fixtures/big_screens.json'
import {crudWorkflowSuite} from "./crudWorkflow";

screenSizes.map(screenSize => {

    return describe(`runs on ${screenSize}`, () => {
        beforeEach(()=>{
            cy.viewport(screenSize as ViewportPreset)
        })
        crudWorkflowSuite()
    })

})

export {}
