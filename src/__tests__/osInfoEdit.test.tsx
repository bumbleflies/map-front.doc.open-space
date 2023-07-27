import React from 'react';
import {act, fireEvent, getByRole, render, screen} from '@testing-library/react';
import {MarkerType} from "../types/marker";
import {localDayjs} from "../helper/dayjsTimezone";
import {LatLng} from "leaflet";
import {OpenSpaceInfoEditDialog} from "../components/osInfoEdit";

const testOpenSpaceMarker: MarkerType = {
    identifier: 'test-123',
    title: 'Test title',
    startDate: localDayjs().startOf('hour'),
    endDate: localDayjs().startOf('hour').add(2, 'hours'),
    position: new LatLng(1, 2)
}

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

describe('Open Space Info Page', () => {
    const saveMarkerMock = jest.fn()
    const closeDialogMock = jest.fn()
    beforeEach(() => {
        act(() => {
            render(<OpenSpaceInfoEditDialog marker={testOpenSpaceMarker} saveMarker={saveMarkerMock} editOpen={true}
                                            closeDialogHandler={closeDialogMock}/>);
        })
    })
    it('displays the Open Space Title', () => {
        // input and div both got same testid
        expect(getTitleInputElement()).toHaveValue(testOpenSpaceMarker.title)
    })

    it('displays the Open Space Dates', () => {
        expect(getDateInputElement('Start Date'))
            .toHaveValue(testOpenSpaceMarker.startDate.format('DD.MM.YYYY HH:mm'))
        expect(getDateInputElement('End Date'))
            .toHaveValue(testOpenSpaceMarker.endDate.format('DD.MM.YYYY HH:mm'))
    })

    it('updates title on save', () => {
        fireEvent.change(getTitleInputElement(), {target: {value: 'new title'}})
        screen.getByTestId('os-edit-save').click();
        expect(saveMarkerMock).toHaveBeenCalledWith({
            ...testOpenSpaceMarker,
            title: 'new title',
        })
    })

    it('updates start when end is before start date', () => {
        let newDateString = testOpenSpaceMarker.endDate.subtract(11, 'hours').format('DD.MM.YYYY HH:mm')
        setNewDateValue('End Date', newDateString);
        screen.getByTestId('os-edit-save').click();

        expect(saveMarkerMock).toHaveBeenCalledWith({
            ...testOpenSpaceMarker,
            startDate: localDayjs(newDateString, 'DD.MM.YYYY HH:mm').subtract(2, 'hours'),
            endDate: localDayjs(newDateString, 'DD.MM.YYYY HH:mm'),
        })

    })

    it('updates end when start is before end date', () => {
        let newDateString = testOpenSpaceMarker.startDate.add(11, 'hours').format('DD.MM.YYYY HH:mm')
        setNewDateValue('Start Date', newDateString);
        screen.getByTestId('os-edit-save').click();

        expect(saveMarkerMock).toHaveBeenCalledWith({
            ...testOpenSpaceMarker,
            startDate: localDayjs(newDateString, 'DD.MM.YYYY HH:mm'),
            endDate: localDayjs(newDateString, 'DD.MM.YYYY HH:mm').add(2, 'hours'),
        })
    })

    it('doesnt calls save when canceled', () => {
        screen.getByTestId('os-edit-cancel').click();
        expect(saveMarkerMock).not.toHaveBeenCalled()
    })

    it('calls the close popup handler on save', () => {
        screen.getByTestId('os-edit-save').click();
        expect(closeDialogMock).toHaveBeenCalled()
    })

    it('calls the close popup handler on cancel', () => {
        screen.getByTestId('os-edit-cancel').click();
        expect(closeDialogMock).toHaveBeenCalled()
    })


})
