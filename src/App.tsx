import React from 'react';
import './App.css';
import {AppBar, Avatar, Container, Toolbar, Typography} from "@mui/material";
import {OSMap} from "./os/map";
import {Image} from "mui-image";

const containerStyle = {
    width: '100%',
    height: '80vh'
};

const munich = {
    lat: 48.135125,
    lng: 11.581980
};

const OpenSpaceDocApp = () => {

    return (
        <Container>
            <AppBar position={"static"}>
                <Toolbar>
                    <Avatar>
                        <Image src={"/bumblefly-blue.png"}></Image>
                    </Avatar>

                    <Typography component="h1" variant="h4">
                        Open Space - Doc
                    </Typography>
                </Toolbar>
            </AppBar>
            <OSMap startLocation={munich} containerStyle={containerStyle}></OSMap>
        </Container>
    )
}

export default React.memo(OpenSpaceDocApp)
