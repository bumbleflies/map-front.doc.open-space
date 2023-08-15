import {act, fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import {OpenSpaceHarvesterHome} from "../components/osHome";
import {LatLng, Map} from 'leaflet'

const saveMockResult = {called: false}

jest.mock('../components/osMap')
jest.mock('react-router-dom', () => ({
    useNavigate: () => ({}),
    useFetcher: () => {
        return {
            data: null,
            submit: () => {
                saveMockResult.called = true
            }
        }
    },
    useLocation: () => {
        return {pathname: ''}
    },
    Outlet: () => null

}));


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
