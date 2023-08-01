import React, {ChangeEvent, useContext, useState} from "react";
import {MarkerType} from "../types/marker";
import {Box, CardMedia, Divider, Grid, Typography} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {OpenSpaceInfoEditDialog} from "./osInfoEdit";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/Tag';
import {IconTextGrid} from "./iconTextGrid";
import {Endpoints} from "../config/Endpoints";
import {OsImageNotAvailable, OsImageType} from "../types/api";
import OpenSpaceImagesContext, {OpenSpaceImagesContextType} from "./os/openSpaceContext";

import {apiServices as imageApi} from "../helper/imageApi";
import {OverlayButton} from "./overlayButton";
import {MenuActionButton} from "./menuActionButton";

type OpenSpaceInfoProps = {
    marker: MarkerType
    removeMarker: (marker: MarkerType) => void
    updateMarker: (marker: MarkerType) => void
}

export const OpenSpaceInfo = (props: OpenSpaceInfoProps) => {
    const [infoMarker, setInfoMarker] = useState<MarkerType>(props.marker)
    const [editOpen, setEditOpen] = useState<boolean>(false)
    const [popoverOpen, setPopoverOpen] = useState<boolean>(false)
    const {headerImage, setHeaderImage} = useContext<OpenSpaceImagesContextType>(OpenSpaceImagesContext)

    function updateMarker(marker: MarkerType) {
        props.updateMarker(marker)
        setInfoMarker(marker)
    }

    function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files !== null && e.target.files.length > 0) {
            imageApi.upload({
                osIdentifier: infoMarker.identifier,
                imageFile: e.target.files[0]
            }).then((result: OsImageType | OsImageNotAvailable) => {
                setHeaderImage(result)
            })
        }
    }

    return (
        <Box sx={{}}>
            <Grid container spacing={0} alignItems={"center"}>
                {/* Image */}
                <Grid item xs={12} textAlign={"center"}>
                    <div onMouseLeave={() => setPopoverOpen(false)}
                        //onClick={() => setPopoverOpen(true)}
                         onMouseEnter={() => setPopoverOpen(true)}>
                        {headerImage.isAvailable ?
                            <CardMedia
                                component="img"
                                height="300"
                                image={Endpoints.openSpaceImage(infoMarker.identifier, (headerImage as OsImageType).imageIdentifier)}
                                alt={`Image ${(headerImage as OsImageType).imageIdentifier} in Open Space ${infoMarker.identifier}`}
                            />
                            :
                            <CardMedia
                                component="img"
                                height="300"
                                image={'/img/no-image-icon.png'}
                                alt={'no image yet available'}
                            />

                        }
                        <OverlayButton display={popoverOpen} onImageUpload={handleImageUpload}/>
                    </div>
                </Grid>
                {/* Title */}
                <Grid item xs={12}>
                    <Box sx={{p: 2}}>
                        <Typography data-testid={'os-title'} variant={"h6"}>{infoMarker.title}</Typography>
                    </Box>
                </Grid>

                <Grid item xs={12} container>
                    <Box sx={{py: 2, flexGrow: 1}}>
                        <Divider/>
                    </Box>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={4}/>
                    <MenuActionButton onClickHandler={() => setEditOpen(true)} icon={<EditIcon/>} name={"Edit"}/>
                    <MenuActionButton onClickHandler={() => props.removeMarker(props.marker)} icon={<DeleteIcon/>}
                                      name={"Delete"}/>
                    <Grid item xs={4}/>
                </Grid>
                <Grid item xs={12} container>
                    <Box sx={{py: 2, flexGrow: 1}}>
                        <Divider/>
                    </Box>
                </Grid>
                {/* Dates */}
                <IconTextGrid name={'start date'} icon={<WbSunnyIcon/>}
                              text={infoMarker.startDate.format("DD.MM.YYYY - HH:mm ")}/>
                <IconTextGrid name={'end date'} icon={<NightlightIcon/>}
                              text={infoMarker.endDate.format("DD.MM.YYYY - HH:mm ")}/>
                <IconTextGrid name={'position'} icon={<LocationOnIcon/>}
                              text={`${infoMarker.position.lat}, ${infoMarker.position.lng}`}/>
                <IconTextGrid name={'identifier'} icon={<TagIcon/>} text={infoMarker.identifier}/>
            </Grid>

            <OpenSpaceInfoEditDialog editOpen={editOpen} closeDialogHandler={() => setEditOpen(false)}
                                     marker={infoMarker} saveMarker={updateMarker}/>
        </Box>
    )
}