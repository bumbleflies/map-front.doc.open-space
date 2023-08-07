import {Toolbar} from "@mui/material";
import {DesktopDrawer, MobileDrawer} from "./drawer";
import {useNavigate} from "react-router-dom";
import {OpenSpaceImages} from "./osImages";
import React from "react";

const OpenSpaceImageDrawer = () => {
    const navigate = useNavigate()
    console.log("OpenSpaceImages")
    return (
        <>
            <DesktopDrawer onCloseHandler={() => navigate(`/`)}>
                <Toolbar/>
                <OpenSpaceImages/>
            </DesktopDrawer>
            <MobileDrawer onCloseHandler={() => navigate(`/`)}>
                <OpenSpaceImages/>
            </MobileDrawer>
        </>
    )
}

export default OpenSpaceImageDrawer
