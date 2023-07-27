import React, {useState} from "react";
import {Container, ImageList, ImageListItem, ImageListItemBar, ListItem} from "@mui/material";
import {Image} from "mui-image";
import {CameraPreview, CameraTakePictureDialog} from "./camera";

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


    const [image, setImage] = useState<string>('')

    const showTakePhotoDialog = () => {
        setTakePhotoDialogShown(true)
    }
    const closeTakePhotoDialog = () => {
        setTakePhotoDialogShown(false)
    }

    const captureImage = (image: string) => {
        setImage(image)
    }

    return (
        <Container>
            <ImageList sx={{width: "100%", height: props.height}}>

                <ListItem sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex"

                }}>
                    <CameraPreview isShown={props.shown} showTakePhotoDialogCallback={showTakePhotoDialog}/>
                    <CameraTakePictureDialog isOpen={takePhotoDialogShown}
                                             closeTakePhotoDialogCallback={closeTakePhotoDialog}
                                             setImageCallback={captureImage}/>
                </ListItem>
                {image !== '' ? <Image src={image}></Image> : null}
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