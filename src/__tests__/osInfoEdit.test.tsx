import React from 'react';
import {act, fireEvent, getByRole, render, screen} from '@testing-library/react';
import {MarkerType} from "../types/marker";
import {localDayjs} from "../helper/dayjsTimezone";
import {LatLng} from "leaflet";
import {OpenSpaceInfoEditDialog} from "../components/info/osInfoEdit";
// https://github.com/testing-library/react-testing-library/issues/379
import '@testing-library/jest-dom/extend-expect'
import {OSApiType} from "../types/api";
import {markerToOs} from "../helper/apiMapper";

const mockOpenSpaceMarker: MarkerType = {
    identifier: 'test-123',
    title: 'Test title',
    startDate: localDayjs().startOf('hour'),
    endDate: localDayjs().startOf('hour').add(2, 'hours'),
    position: new LatLng(1, 2)
}
const mockSaveHandler = jest.fn()
const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
    useLoaderData: () => mockOpenSpaceMarker,
    useNavigate: () => (to: string) => {
        mockNavigate(to)
    },
    useParams: () => ({
        id: null
    }),
    useSubmit: () => (newMarkerApiType: OSApiType) => {
        mockSaveHandler(newMarkerApiType)
    }
}));

function getTitleInputElement() {
    let inputElements = screen.getAllByTestId('os-edit-title').filter(e => e.tagName === 'INPUT');
    expect(inputElements).toBeTruthy()
    return inputElements.pop()!;
}

function getDateInputElement(label: string) {
    return screen.getByRole('textbox', {name: label});
}

function setNewDateValue(label: string, newDateString: string) {
    fireEvent.change(getDateInputElement(label), {target: {value: newDateString}})
    fireEvent.click(getByRole(screen.getByLabelText(label).parentElement!, 'button'))
    fireEvent.click(screen.getByRole('button', {name: 'OK'}))
}

const maybe = process.env.JEST_NO_SKIP ? it : it.skip;


describe('Open Space Info Page', () => {
    beforeEach(() => {
        act(() => {
            render(<OpenSpaceInfoEditDialog/>);
        })
    })
    it('displays the Open Space Title', () => {
        // input and div both got same testid
        expect(getTitleInputElement()).toHaveValue(mockOpenSpaceMarker.title)
    })

    it('displays the Open Space Dates', () => {
        expect(getDateInputElement('Start Date'))
            .toHaveValue(mockOpenSpaceMarker.startDate.format('DD.MM.YYYY HH:mm'))
        expect(getDateInputElement('End Date'))
            .toHaveValue(mockOpenSpaceMarker.endDate.format('DD.MM.YYYY HH:mm'))
    })

    it('updates title on save', () => {
        fireEvent.change(getTitleInputElement(), {target: {value: 'new title'}})
        screen.getByTestId('os-edit-save').click();
        expect(mockSaveHandler).toHaveBeenCalledWith(markerToOs({
            ...mockOpenSpaceMarker,
            title: 'new title',
        }))
    })

    maybe('updates start when end is before start date', () => {
        let newDateString = mockOpenSpaceMarker.endDate.subtract(11, 'hours').format('DD.MM.YYYY HH:mm')
        setNewDateValue('End Date', newDateString);
        screen.getByTestId('os-edit-save').click();

        expect(mockSaveHandler).toHaveBeenCalledWith(markerToOs({
            ...mockOpenSpaceMarker,
            startDate: localDayjs(newDateString, 'DD.MM.YYYY HH:mm').subtract(2, 'hours'),
            endDate: localDayjs(newDateString, 'DD.MM.YYYY HH:mm'),
        }))

    })

    maybe('updates end when start is before end date', () => {
        let newDateString = mockOpenSpaceMarker.startDate.add(11, 'hours').format('DD.MM.YYYY HH:mm')
        setNewDateValue('Start Date', newDateString);
        screen.getByTestId('os-edit-save').click();

        expect(mockSaveHandler).toHaveBeenCalledWith(markerToOs({
            ...mockOpenSpaceMarker,
            startDate: localDayjs(newDateString, 'DD.MM.YYYY HH:mm'),
            endDate: localDayjs(newDateString, 'DD.MM.YYYY HH:mm').add(2, 'hours'),
        }))
    })

    it('doesnt calls save when canceled', () => {
        screen.getByTestId('os-edit-cancel').click();
        expect(mockSaveHandler).not.toHaveBeenCalled()
    })

    it('returns to os info on cancel', () => {
        screen.getByTestId('os-edit-cancel').click();
        expect(mockNavigate).toHaveBeenCalledWith('/os/test-123')
    })


})
