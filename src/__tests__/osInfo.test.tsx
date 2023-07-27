import React from 'react';
import {render, screen} from '@testing-library/react';
import {OpenSpaceInfo} from "../components/osInfo";
import {MarkerType} from "../types/marker";
import {localDayjs} from "../helper/dayjsTimezone";
import {LatLng} from "leaflet";

const testOpenSpaceMarker: MarkerType = {
    identifier: 'test-123',
    title: 'Test title',
    startDate: localDayjs(),
    endDate: localDayjs().add(2, 'hours'),
    position: new LatLng(1, 2)
}

describe('Open Space Info Page', () => {
    beforeEach(() => {
        render(<OpenSpaceInfo marker={testOpenSpaceMarker} removeMarker={() => {
        }} updateMarker={() => {
        }}/>);
    })
    it('displays the Open Space Title', () => {
        const titleElement = screen.getByTestId('os-title');
        expect(titleElement).toBeInTheDocument();
        expect(titleElement.textContent).toBe(testOpenSpaceMarker.title)
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
})
