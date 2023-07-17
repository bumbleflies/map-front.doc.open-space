import {AppBar, Box, Fab, IconButton, styled, Toolbar} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import React from "react";

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
});

type OSActionMenuProps = { addMarker: () => void, centerCurrentLocation: () => void };

export const OSActionMenu = (props: OSActionMenuProps) => {
    return (
        <AppBar position="sticky" color="primary" sx={{top: 'auto', bottom: 10}}>
            <Toolbar>
                <Box sx={{flexGrow: 1}}/>
                <StyledFab color="secondary" aria-label="add" onClick={props.addMarker}>
                    <AddIcon/>
                </StyledFab>
                <Box sx={{flexGrow: 1}}/>
                <IconButton onClick={props.centerCurrentLocation} color="inherit"
                            aria-label={"current location"}>
                    <MyLocationIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    )
};