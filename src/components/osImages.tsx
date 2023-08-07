import {IconButton, ImageList, ImageListItem, ImageListItemBar, ListItemButton, ListSubheader} from "@mui/material";
import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {Outlet, useLoaderData, useNavigate} from "react-router-dom";
import {OsImageType} from "../types/api";
import {Endpoints} from "../config/Endpoints";

export const OpenSpaceImages = () => {
    const navigate = useNavigate()
    const images = useLoaderData() as OsImageType[]

    return (
        <>
            <ImageList>
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">Impressions</ListSubheader>
                </ImageListItem>
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
                                    sx={{color: 'rgba(255, 255, 255, 0.54)'}}
                                    aria-label={`info about ${item.imageIdentifier}`}
                                >
                                    <InfoIcon/>
                                </IconButton>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            <Outlet/>
        </>
    )
}