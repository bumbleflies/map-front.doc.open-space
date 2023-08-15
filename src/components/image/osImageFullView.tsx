import {Box, CardMedia, Drawer, IconButton, Toolbar} from "@mui/material";
import React from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {Endpoints} from "../../config/Endpoints";
import CloseIcon from '@mui/icons-material/Close';

export const OsImageFullView = () => {
    const {os_id} = useParams<"os_id">();
    const {image_id} = useParams<"image_id">();
    const navigate = useNavigate()
    return (
        <>
            <Outlet/>
            <Drawer
                variant={"permanent"}
                anchor={"right"} open={true}
                sx={{
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {width: 'calc(100% - 400px)', boxSizing: 'border-box'},
                    display: {xs: 'none', sm: 'block'}
                }}
                PaperProps={{
                    sx: {
                        height: '90vh',
                        top: 0,
                        backgroundColor: "black",
                        color: "white"
                    },
                }}>
                <Toolbar/>
                <Toolbar>
                    <Box flexGrow={1}/>
                    <IconButton data-testid={"os-images-close-fullscreen-button"} aria-label={"cloe fullscreen image"}
                                onClick={() => {
                                    navigate('..')
                                }} color="inherit">
                        <CloseIcon/>
                    </IconButton>
                </Toolbar>
                <Box flexGrow={1} margin={10}>
                    <CardMedia
                        width="100%"
                        component={"img"}
                        image={Endpoints.openSpaceImage({osIdentifier: os_id!, imageIdentifier: image_id!})}>
                    </CardMedia>
                </Box>
            </Drawer>
        </>
    )
}