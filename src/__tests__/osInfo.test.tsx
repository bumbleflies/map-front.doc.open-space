import React from 'react';
import {render, screen} from '@testing-library/react';
import {OpenSpaceInfo} from "../components/osInfo";
import {MarkerType} from "../types/marker";
import {localDayjs} from "../helper/dayjsTimezone";
import {LatLng} from "leaflet";
// https://github.com/testing-library/react-testing-library/issues/379
import '@testing-library/jest-dom/extend-expect'

const mockOpenSpaceMarker: MarkerType = {
    identifier: 'test-123',
    title: 'Test title',
    startDate: localDayjs(),
    endDate: localDayjs().add(2, 'hours'),
    position: new LatLng(1, 2)
}

const mockDeleteHandler = jest.fn()

jest.mock('react-router-dom', () => ({
    useLoaderData: () => {
        return {
            identifier: 'test-123',
            title: 'Test title',
            startDate: {format: () => 12},
            endDate: {format: () => 13},
            position: [1, 2]
        }
    },
    useNavigate: () => ({}),
    useParams: () => ({
        id: null
    }),
    useSubmit: () => () => {
        mockDeleteHandler()
    },
    Outlet: () => null
}));


describe('Open Space Info Page', () => {
    beforeEach(() => {
        render(<OpenSpaceInfo/>);
    })
    it('displays the Open Space Title', () => {
        const titleElement = screen.getByTestId('os-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.textContent).toBe(mockOpenSpaceMarker.title)
    })
    it('displays the Open Space Dates', () => {
        expect(screen.getByTestId('grid-start date-text')).toBeInTheDocument();
        expect(screen.getByTestId('grid-end date-text')).toBeInTheDocument();
    })
    it('displays the Open Space Location', () => {
        expect(screen.getByTestId('grid-position-text')).toBeInTheDocument();
    })
    it('displays the Open Space Identifier', () => {
        expect(screen.getByTestId('grid-identifier-text')).toBeInTheDocument();
    })

    it('calls the removeMarker when delete is clicked', () => {
        screen.getByTestId('os-delete-button').click();
        expect(mockDeleteHandler).toHaveBeenCalled()
    })
})
