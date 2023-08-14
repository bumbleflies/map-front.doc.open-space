import {act, fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import App from "../App";

describe('Open Space Home - Integration', () => {
    beforeEach(() => {
        render(<App/>)
    })
    it('removes the snackbar when clicked on the link', () => {
        act(() => {
            fireEvent.click(screen.getByTestId('os-home-fab-add'));
        })

    })
})
