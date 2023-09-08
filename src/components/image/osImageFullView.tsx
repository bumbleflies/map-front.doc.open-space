import {
    Box,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Drawer,
    IconButton,
    Toolbar,
    useMediaQuery
} from "@mui/material";
import React from "react";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {Endpoints} from "../../config/Endpoints";
import CloseIcon from '@mui/icons-material/Close';
import {useTheme} from "@mui/material/styles";

type OsImageFullViewProps= {
    resolve:()=>string
}

export const OsImageFullView = (props: OsImageFullViewProps) => {
    const {os_id} = useParams<"os_id">();
    const {image_id} = useParams<"image_id">();
    const navigate = useNavigate()
    const theme = useTheme()
    const onDesktop = useMediaQuery(theme.breakpoints.up('sm'))

    return (
        <>
            <Outlet/>
            {onDesktop ?
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
                        <IconButton data-testid={"os-image-fullscreen-close-button"}
                                    aria-label={"close fullscreen image"}
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
                            image={props.resolve()}
                            data-testid={"os-image-fullscreen"}>
                        </CardMedia>
                    </Box>
                </Drawer>
                :
                <Dialog open={true} sx={{display: {xs: 'block', sm: 'none'}}} onClose={() => navigate('..')}>
                    <DialogTitle>
                        <IconButton data-testid={"os-image-fullscreen-close-button"}
                                    aria-label={"close fullscreen image"}
                                    onClick={() => {
                                        navigate('..')
                                    }} color="inherit"
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 2
                                    }}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <CardMedia
                            width="100%"
                            component={"img"}
                            image={Endpoints.openSpaceImage({osIdentifier: os_id!, imageIdentifier: image_id!})}
                            data-testid={"os-image-fullscreen"}>
                        </CardMedia>
                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            }
        </>
    )
}