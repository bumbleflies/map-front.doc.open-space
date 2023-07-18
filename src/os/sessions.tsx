import React, {useState} from "react";
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListItem
} from "@mui/material";
import {Camera} from "react-camera-pro";
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import CameraIcon from '@mui/icons-material/Camera';
import ClearIcon from '@mui/icons-material/Clear';

const osSessionData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];
type OpenSpaceSessionsProps = {
    height: string | number,
    shown: boolean
}
export const OpenSpaceSessions = (props: OpenSpaceSessionsProps) => {
    const [takePhotoDialogShown, setTakePhotoDialogShown] = useState(false)
    const showTakePhotoDialog = () => {
        setTakePhotoDialogShown(true)
    }
    const closeTakePhotoDialog = () => {
        setTakePhotoDialogShown(false)
    }
    return (
        <Container>
            <ImageList sx={{width: "100%", height: props.height}}>

                <ListItem sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex"

                }}>
                    <CameraEnhanceIcon sx={{
                        // action in the middle
                        transform: 'translateX(-50%),translateY(-50%)'
                    }} fontSize={"large"}/>
                    <Box className={"cameraOverlay"} sx={{
                        opacity: ".5",
                    }}
                         onClick={showTakePhotoDialog}>
                        {/*https://github.com/purple-technology/react-camera-pro*/}
                        {props.shown ? <Camera errorMessages={{}} facingMode='environment'></Camera> : null}
                    </Box>
                    <Dialog open={takePhotoDialogShown} fullScreen>

                        <Button onClick={closeTakePhotoDialog} sx={{
                            // https://mui.com/material-ui/customization/z-index/
                            zIndex: 100
                        }}>
                            <ClearIcon/>
                        </Button>
                        <DialogContent>
                            {takePhotoDialogShown ?
                                <Camera errorMessages={{}} facingMode='environment'></Camera> : null}
                        </DialogContent>
                        <DialogActions sx={{
                            // action in the middle
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex"
                        }}>
                            <Button>
                                <CameraIcon sx={{
                                    // action in the middle
                                    transform: 'translateX(-50%),translateY(-50%)',
                                    fontSize: 80
                                }}/>
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ListItem>
                {osSessionData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img
                            src={`${item.img}?w=248&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.title}
                            position="bottom"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </Container>
    )
}
