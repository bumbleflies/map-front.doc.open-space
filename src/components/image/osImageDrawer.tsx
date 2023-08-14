import {Toolbar} from "@mui/material";
import {DesktopDrawer, MobileDrawer} from "../drawer";
import {Outlet, useNavigate} from "react-router-dom";
import {OsImageTabList} from "./osImageTabList";
import React from "react";

const OpenSpaceImageDrawer = () => {
    const navigate = useNavigate()
    return (
        <>
            <DesktopDrawer onCloseHandler={() => navigate(`/`)}>
                <Toolbar/>
                <OsImageTabList/>
            </DesktopDrawer>
            <MobileDrawer onCloseHandler={() => navigate(`/`)}>
                <OsImageTabList/>
            </MobileDrawer>
            <Outlet/>
        </>
    )
}

export default OpenSpaceImageDrawer
