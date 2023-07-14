import React from 'react';
import './App.css';
import {Container, Typography} from "@mui/material";
import {OSMap} from "./os/map";

const containerStyle = {
    width: '100%',
    height: '800px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const OpenSpaceDocApp = () => {

    return (
        <Container>
            <Typography component="h1" variant="h5">
                Open Space - Doc
            </Typography>
            <OSMap startLocation={center} containerStyle={containerStyle}></OSMap>
        </Container>
    )
}

export default React.memo(OpenSpaceDocApp)
