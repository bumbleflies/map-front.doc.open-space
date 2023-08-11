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
import {Outlet, useFetcher, useLoaderData, useNavigate, useParams} from "react-router-dom";
import {Endpoints} from "../config/Endpoints";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {OsImageType} from "../types/image";
import {OpenSpaceImageAddDialog} from "./osImageAddDialog";
import {OsImageMenu} from "./menu/osImageMenu";

export const OpenSpaceImages = () => {
    const navigate = useNavigate()
    const images = useLoaderData() as OsImageType[]
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
                {images.map((item) => (
                    <ImageListItem key={item.imageIdentifier}>
                        <img
                            src={Endpoints.openSpaceImage(item.osIdentifier, item.imageIdentifier)}
                            alt={item.imageIdentifier}
                            loading="lazy"
                        />
                        <ImageListItemBar
                            title={item.imageIdentifier}
                            subtitle={item.imageIdentifier}
                            actionIcon={
                                <IconButton
                                    sx={{color: 'white'}}
                                    aria-label={`star ${item.imageIdentifier}`}
                                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => openMenu(event, item.imageIdentifier)}
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
            <Outlet/>
        </>
    )
}