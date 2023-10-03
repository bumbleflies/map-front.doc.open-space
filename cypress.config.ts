import {defineConfig} from "cypress";

require('dotenv').config()

export default defineConfig({
    projectId: 'jdv5dx',
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
    env: {
        auth0_username: process.env.CYPRESS_TEST_USERNAME,
        auth0_password: process.env.CYPRESS_TEST_PASSWORD,
        auth0_domain: process.env.REACT_APP_AUTH_DOMAIN,
    },
    retries: {
        // Configure retry attempts for `cypress run`
        // Default is 0
        runMode: 0,
        // Configure retry attempts for `cypress open`
        // Default is 0
        openMode: 0
    }
});
