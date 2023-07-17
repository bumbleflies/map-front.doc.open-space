import React from 'react';
import './App.css';
import {AppBar, Avatar, Box, Paper, Toolbar, Typography} from "@mui/material";
import {OSMapView} from "./map/view";
import {Image} from "mui-image";


const munich = {
    lat: 48.135125,
    lng: 11.581980
};

const OpenSpaceDocApp = () => {
    return (
        <Paper>
            <AppBar position={"static"}>
                <Toolbar>
                    <Avatar>
                        <Image src={"/bumblefly-blue.png"}></Image>
                    </Avatar>
                    <Box sx={{flexGrow: 1}}/>

                    <Typography component="h1" variant="h4">
                        OS Locator
                    </Typography>
                </Toolbar>
            </AppBar>
            <OSMapView startLocation={munich}></OSMapView>
        </Paper>
    )
}

export default React.memo(OpenSpaceDocApp)
