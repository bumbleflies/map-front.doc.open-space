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
    MenuItem
} from "@mui/material";
import React, {useState} from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {Outlet, useLoaderData, useNavigate, useParams, useSubmit} from "react-router-dom";
import {OsImageType} from "../types/api";
import {Endpoints} from "../config/Endpoints";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from "@mui/icons-material/Delete";
import CollectionsIcon from '@mui/icons-material/Collections';

export const OpenSpaceImages = () => {
    const navigate = useNavigate()
    const images = useLoaderData() as OsImageType[]
    const {os_id} = useParams<"os_id">();
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const actionSubmit = useSubmit()


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
                    <ListItemButton onClick={() => navigate('add')}>
                        <AddPhotoAlternateIcon fontSize={"large"}/>
                    </ListItemButton>
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
                <MenuItem onClick={closeMenu}>
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