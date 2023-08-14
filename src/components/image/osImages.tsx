import {ButtonBase, Tab} from "@mui/material";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {OsImageImpressionsList} from "./imageImpressions";

export const OpenSpaceImages = () => {
    const navigate = useNavigate()
    const [selectedTab, setSelectedTab] = useState<string>("1")


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
    };


    return (
        <>
            <TabContext value={selectedTab}>
                <TabList onChange={handleChange}>
                    <ButtonBase data-testid={"os-images-back-button"} aria-label={"back"} onClick={() => {
                        navigate('..')
                    }}>
                        <ArrowBackIcon/>
                    </ButtonBase>
                    <Tab label="Impressions" value={"1"}></Tab>
                    <Tab label="Sessions" value={"2"}></Tab>
                </TabList>
                <TabPanel value={"1"}>
                    <OsImageImpressionsList/>
                </TabPanel>
                <TabPanel value={"2"}>Sessions</TabPanel>
            </TabContext>

        </>
    )
}