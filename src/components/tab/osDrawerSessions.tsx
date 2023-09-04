import {Toolbar} from "@mui/material";
import {DesktopDrawer, MobileDrawer} from "../drawer";
import {Outlet, useNavigate} from "react-router-dom";
import React from "react";

const OsDrawerSessions = () => {
    const navigate = useNavigate()
    return (
        <>
            <DesktopDrawer onCloseHandler={() => navigate(`/`)}>
                <Toolbar/>
                Sessions
            </DesktopDrawer>
            <MobileDrawer onCloseHandler={() => navigate(`/`)}>
                Sessions
            </MobileDrawer>
            <Outlet/>
        </>
    )
}

export default OsDrawerSessions
