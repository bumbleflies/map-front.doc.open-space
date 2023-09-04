import {ButtonBase, Tab} from "@mui/material";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {OsImpressionsTab} from "../impression/osImpressionsTab";
import {OsSessionsTab} from "../session/osSessionsTab";
import {OsTabListDrawerProps} from "./osTabListDrawer";


export const OsTabList = (props: OsTabListDrawerProps) => {
    const navigate = useNavigate()
    const {os_id} = useParams<"os_id">()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        navigate(`/os/${os_id}/${newValue}`);
    };

    return (
        <>
            <TabContext value={props.active}>
                <TabList onChange={handleChange}>
                    <ButtonBase data-testid={"os-images-back-button"} aria-label={"back"}
                                onClick={() => navigate(`/os/${os_id}`)}>
                        <ArrowBackIcon/>
                    </ButtonBase>
                    <Tab label="Impressions" value={"i"}></Tab>
                    <Tab label="Sessions" value={"s"} data-testid={"os-sessions-tab"}></Tab>
                </TabList>
                <TabPanel value={"i"}>
                    <OsImpressionsTab/>
                </TabPanel>
                <TabPanel value={"s"}>
                    <OsSessionsTab/>
                </TabPanel>
            </TabContext>

        </>
    )
}