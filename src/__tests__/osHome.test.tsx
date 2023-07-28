import {render} from "@testing-library/react";
import React from "react";
import {OpenSpaceHarvesterHome} from "../components/osHome";

jest.mock('../components/osMap')
jest.mock('react-router-dom', () => ({
    useLoaderData: () => [],
    useNavigate: () => ({}),
    useParams: () => ({})
}));

describe('Open Space Home', () => {
    beforeEach(() => {
        render(<OpenSpaceHarvesterHome/>)
    })
    it('removes the snackbar when clicked on the link', () => {

    })
})