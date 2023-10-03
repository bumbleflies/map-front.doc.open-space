import axios from "axios";

export const login = async () => {
    cy.wrap(axios.get('http://localhost:5000/auth/token', {
        params: {
            email: Cypress.env('auth0_username'),
            password: Cypress.env('auth0_password')
        }
    }).then(response => {
        Cypress.log({
            displayName: 'AUTH0 LOGIN',
            message: [`🔐 Authenticating | ${Cypress.env('auth0_username')}`],
            autoEnd: true,
        }).snapshot('login successful, storing token')
        return response.data
    })).as('bearerToken')
}
export const createOs = async (bearerToken: string) => {
    cy.wrap(axios.post('http://localhost:5000/os', {
                "location": {
                    "lat": 1.01,
                    "lng": 2.02
                },
                "title": "[Test-123] Open Space",
                "start_date": "2023-08-14T17:00:00.000Z",
                "end_date": "2023-08-14T19:00:00.000Z"
            }, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                }
            }
        ).then((result) => {
                Cypress.log({
                    displayName: 'BACKEND API',
                    message: [`✅ Create OS | ${result.data.identifier}`],
                    autoEnd: true,
                }).snapshot('created os')
                return result.data.identifier
            }
        )
    ).as('testOsId')
}

export const deleteOs = (bearerToken: string) => {
    // just let the data be there, no delete anymore
}