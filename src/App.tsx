import React from 'react';
import './App.css';
import {Container, Typography} from "@mui/material";
import {OSMap} from "./os/map";

const containerStyle = {
    width: '100%',
    height: '800px'
};

const munich = {
    lat: 48.135125,
    lng: 11.581980
};

const OpenSpaceDocApp = () => {

    return (
        <Container>
            <Typography component="h1" variant="h5">
                Open Space - Doc
            </Typography>
            <OSMap startLocation={munich} containerStyle={containerStyle}></OSMap>
        </Container>
    )
}

export default React.memo(OpenSpaceDocApp)
