import {
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListItem,
    ListItemButton,
    ListSubheader,
    Skeleton
} from "@mui/material";
import React, {useEffect, useState} from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {useFetcher, useLoaderData, useNavigate, useParams} from "react-router-dom";
import {Endpoints} from "../config/Endpoints";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {ImageWithDetailsType} from "../types/image";
import {OpenSpaceImageAddDialog} from "./osImageAddDialog";
import {OsImageMenu} from "./menu/osImageMenu";

export const OpenSpaceImages = () => {
    const navigate = useNavigate()
    const images = useLoaderData() as ImageWithDetailsType[]
    const {os_id} = useParams<"os_id">();
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const imageUploadFetcher = useFetcher()

    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [pendingImages, setPendingImages] = useState<string[]>([])

    useEffect(() => {
        if (Boolean(imageUploadFetcher.data)) {
            console.log('make skeletons for pending images: ' + JSON.stringify(imageUploadFetcher.data))
            setPendingImages(imageUploadFetcher.data)
        }
    }, [imageUploadFetcher.data, setPendingImages])

    const openMenu = (event: React.MouseEvent<HTMLButtonElement>, imageIdentifier: string) => {
        setMenuAnchorEl(event.currentTarget);
        setSelectedImage(imageIdentifier)
    };

    const closeMenu = () => {
        setMenuAnchorEl(null);
        setSelectedImage(null)
    }


    return (
        <>
            <ImageList>
                <ListItem key="Subheader">
                    <ListItemButton onClick={() => {
                        navigate(`/os/${os_id}`)
                    }}>
                        <ArrowBackIcon/>
                    </ListItemButton>
                    <ListSubheader component="div">Impressions</ListSubheader>
                </ListItem>
                <ListItem>
                </ListItem>
                <ImageListItem key={"image-add"} sx={{
                    alignItems: "center",
                    verticalAlign: "middle",
                }}>
                    <ListItemButton onClick={() => setEditOpen(true)} sx={{
                        minHeight: 150
                    }}>
                        <AddPhotoAlternateIcon fontSize={"large"}/>
                    </ListItemButton>
                    <OpenSpaceImageAddDialog isOpen={editOpen} closeHandler={() => setEditOpen(false)}
                                             submit={imageUploadFetcher.submit}/>
                    <ImageListItemBar {...images.length === 0 ? {title: "no images yet"} : null}
                                      subtitle={"click to add impressions"}/>

                </ImageListItem>
                {images.map((image) => (
                    <ImageListItem key={image.imageIdentifier}>
                        <img
                            src={Endpoints.openSpaceImage(image)}
                            alt={image.imageIdentifier}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={image.description}
                            subtitle={image.imageIdentifier}
                            actionIcon={
                                <IconButton
                                    sx={{color: 'white'}}
                                    aria-label={`star ${image.imageIdentifier}`}
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => openMenu(event, image.imageIdentifier)}
                                >
                                    <KeyboardArrowUpIcon/>
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
                {pendingImages.map((image) => (
                    <ImageListItem key={image}>
                        <Skeleton variant="rectangular" width={210} height={150}/>
                        <ImageListItemBar
                            title={image}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <OsImageMenu anchorElement={menuAnchorEl} imageId={selectedImage} closeMenuHandler={closeMenu}/>
        </>
    )
}