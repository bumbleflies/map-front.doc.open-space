import {Toolbar} from "@mui/material";
import {DesktopDrawer, MobileDrawer} from "../drawer";
import {Outlet, useNavigate} from "react-router-dom";
import {OsTabList} from "./osTabList";
import React from "react";

export type OsTabListDrawerProps = {
    active: "s" | "i"
}
const OsDrawerTabList = (props: OsTabListDrawerProps) => {
    const navigate = useNavigate()
    return (
        <>
            <DesktopDrawer onCloseHandler={() => navigate(`/`)}>
                <Toolbar/>
                <OsTabList active={props.active}/>
            </DesktopDrawer>
            <MobileDrawer onCloseHandler={() => navigate(`/`)}>
                <OsTabList active={props.active}/>
            </MobileDrawer>
            <Outlet/>
        </>
    )
}

export default OsDrawerTabList
