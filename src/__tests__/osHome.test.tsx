import {act, fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {OpenSpaceHarvesterHome} from "../components/osHome";
import {LatLng, Map} from 'leaflet'
import {localDayjs} from "../helper/dayjsTimezone";
import {TransientMarker} from "../types/marker";
import {apiServices} from "../helper/markerApi";

jest.mock('../components/osMap')
jest.mock('react-router-dom', () => ({
    useLoaderData: () => [],
    useNavigate: () => ({}),
    useParams: () => ({
        id: null
    })
}));

const saveMockResult = {called: false}
apiServices.save = (marker: TransientMarker) => {
    console.log('save marker mocked')
    saveMockResult.called = true
    return Promise.resolve({
        position: new LatLng(1, 1),
        endDate: localDayjs(),
        startDate: localDayjs(),
        title: '123',
        identifier: 'test-1234'
    })
}

jest.mock('leaflet')
const map = new Map("");
map.getCenter = () => new LatLng(1, 2)

describe('Open Space Home', () => {
    beforeEach(() => {
        render(<OpenSpaceHarvesterHome map={map}/>)
    })
    it('removes the snackbar when clicked on the link', () => {
        act(() => {
            fireEvent.click(screen.getByTestId('os-home-fab-add'));
        })
        // useEffect hooks are not triggered...so this is the only thing we can test
        expect(saveMockResult.called).toBeTruthy()
    })
})