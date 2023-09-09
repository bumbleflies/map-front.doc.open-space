import {Box, ButtonBase, DialogTitle, Tab} from "@mui/material";
import React from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {OsImpressionsTab} from "../impression/osImpressionsTab";
import {OsSessionsTab} from "../session/osSessionsTab";
import {OsInfoTab} from "../info/osInfoTab";
import {ResponsiveDrawer} from "./drawer";
import CloseIcon from '@mui/icons-material/Close';

export type OsTabListProps = {
    active: "s" | "i" | ""
}

export const OsTabList = (props: OsTabListProps) => {
    const navigate = useNavigate()
    const {os_id} = useParams<"os_id">()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        navigate(`/os/${os_id}/${newValue}`);
    };

    return (
        <>
            <ResponsiveDrawer onCloseHandler={() => navigate(`/`)}>
                <TabContext value={props.active}>
                    <TabList onChange={handleChange}>
                        <Tab label="Info" value={""} data-testid={"os-info-tab"}></Tab>
                        <Tab label="Impressions" value={"i"} data-testid={"os-impressions-tab"}></Tab>
                        <Tab label="Sessions" value={"s"} data-testid={"os-sessions-tab"}></Tab>
                        <Box flexGrow={1}/>
                        <DialogTitle>
                            <ButtonBase data-testid={"os-close-button"} aria-label={"back"}
                                        onClick={() => navigate('/')}>
                                <CloseIcon/>
                            </ButtonBase>
                        </DialogTitle>
                    </TabList>
                    <TabPanel value={""}>
                        <OsInfoTab/>
                    </TabPanel>
                    <TabPanel value={"i"}>
                        <OsImpressionsTab/>
                    </TabPanel>
                    <TabPanel value={"s"}>
                        <OsSessionsTab/>
                    </TabPanel>
                </TabContext>
            </ResponsiveDrawer>
            <Outlet/>
        </>
    )
}