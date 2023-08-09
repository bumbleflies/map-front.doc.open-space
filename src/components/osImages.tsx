import {
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Menu,
    MenuItem,
    Skeleton
} from "@mui/material";
import React, {useEffect, useState} from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {Outlet, useFetcher, useLoaderData, useNavigate, useParams, useSubmit} from "react-router-dom";
import {Endpoints} from "../config/Endpoints";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from "@mui/icons-material/Delete";
import CollectionsIcon from '@mui/icons-material/Collections';
import {OsImageType} from "../types/image";
import {OpenSpaceImageAddDialog} from "./osImageAddDialog";

export const OpenSpaceImages = () => {
    const navigate = useNavigate()
    const images = useLoaderData() as OsImageType[]
    const {os_id} = useParams<"os_id">();
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const actionSubmit = useSubmit()
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

    const deleteImage = () => {
        closeMenu()
        actionSubmit({}, {
            method: 'delete',
            action: `/os/${os_id}/i/${selectedImage}`
        })
    }

    const makeImageHeader = () => {
        closeMenu()
        actionSubmit({is_header: true}, {
            method: 'patch',
            action: `/os/${os_id}/i/${selectedImage}/make_header`
        })
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
            <Menu
                id="image-action-meu"
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={closeMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={makeImageHeader}>
                    <ListItemIcon>
                        <CollectionsIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Make Header
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={deleteImage}>
                    <ListItemIcon>
                        <DeleteIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        Delete Image
                    </ListItemText>
                </MenuItem>
            </Menu>
            <Outlet/>
        </>
    )
}