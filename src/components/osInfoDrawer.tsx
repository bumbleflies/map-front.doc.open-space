import {Drawer, SwipeableDrawer, Toolbar} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {OpenSpaceInfo} from "./osInfo";

const OpenSpaceInfoDrawer = () => {
    const navigate = useNavigate()
    return (
        <>
            {/* Drawer on big screens https://mui.com/system/display/ */}
            <Drawer
                anchor={"left"} open={true}
                onClose={() => navigate("/")}
                sx={{
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: '400px', boxSizing: 'border-box'},
                    display: {xs: 'none', sm: 'block'}
                }}
                PaperProps={{
                    sx: {
                        height: '90vh',
                        top: 0,
                    },
                }}
            >
                <Toolbar/>
                <OpenSpaceInfo/>
            </Drawer>
            <SwipeableDrawer
                sx={{
                    display: {xs: 'block', sm: 'none'}
                }}
                anchor={'bottom'}
                onOpen={() => {
                }}
                onClose={() => navigate('/')}
                open={true}
            >
                <OpenSpaceInfo/>
            </SwipeableDrawer>
        </>
    )
}

export default OpenSpaceInfoDrawer