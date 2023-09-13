import {Box, ButtonBase, DialogTitle, Tab} from "@mui/material";
import React from "react";
import {Outlet, useMatches, useNavigate, useParams} from "react-router-dom";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {ResponsiveDrawer} from "./drawer";
import CloseIcon from '@mui/icons-material/Close';

export type OsTabListProps = {
}

export const OsTabList = (props: OsTabListProps) => {
    const navigate = useNavigate()
    const {os_id} = useParams<"os_id">()

    const matches = useMatches()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        navigate(`/os/${os_id}/${newValue}`);
    };

    const tabIndexFromLocation = () => {
        const tabValue = matches.find(l => l.pathname.split('/').length === 4)?.id
        return tabValue === undefined ? '' : tabValue
    }

    return (
        <>
            <ResponsiveDrawer onCloseHandler={() => navigate(`/`)}>
                <TabContext value={tabIndexFromLocation()}>
                    <TabList onChange={handleChange}>
                        <Tab sx={{display: 'none'}} hidden={true} value={""} data-testid={"os-hidden-tab"}></Tab>
                        <Tab label="Info" value={"d"} data-testid={"os-info-tab"}></Tab>
                        <Tab label="Impressions" value={"i"} data-testid={"os-impressions-tab"}></Tab>
                        <Tab label="Sessions" value={"s/_"} data-testid={"os-sessions-tab"}></Tab>
                        <Box flexGrow={1}/>
                        <DialogTitle>
                            <ButtonBase data-testid={"os-close-button"} aria-label={"back"}
                                        onClick={() => navigate('/')}>
                                <CloseIcon/>
                            </ButtonBase>
                        </DialogTitle>
                    </TabList>
                    <TabPanel value={"d"}>
                        <Outlet/>
                    </TabPanel>
                    <TabPanel value={"i"}>
                        <Outlet/>
                    </TabPanel>
                    <TabPanel value={"s/_"}>
                        <Outlet/>
                    </TabPanel>
                    <TabPanel value={""}>
                        {/* hidden panel for redirect */}
                        <Outlet/>
                    </TabPanel>
                </TabContext>
            </ResponsiveDrawer>
        </>
    )
}