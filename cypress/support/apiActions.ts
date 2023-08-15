import axios from "axios/index";

export const createOs = () => {
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
export const deleteOs = () => {
    cy.get('@testOsId').then((testId) => {
        return axios.delete(`http://localhost:5000/os/${testId}`)
    })
}