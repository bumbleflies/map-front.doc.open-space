import {Toolbar} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {OpenSpaceInfo} from "./osInfo";
import {DesktopDrawer, MobileDrawer} from "./drawer";

const OpenSpaceInfoDrawer = () => {
    const navigate = useNavigate()
    console.log('OpenSpaceInfoDrawer')
    return (
        <>
            {/* Drawer on big screens https://mui.com/system/display/ */}
            <DesktopDrawer onCloseHandler={() => navigate("/")}>
                <Toolbar/>
                <OpenSpaceInfo/>
            </DesktopDrawer>
            <MobileDrawer onCloseHandler={() => navigate('/')}>
                <OpenSpaceInfo/>
            </MobileDrawer>
        </>
    )
}

export default OpenSpaceInfoDrawer