import React, {useState} from "react";
import {MarkerType} from "../types/marker";
import {Avatar, Box, ButtonBase, Divider, Grid, IconButton, Typography} from "@mui/material";
import {Image} from "mui-image";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import {yellow} from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {OpenSpaceInfoEditDialog} from "./osInfoEdit";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/Tag';
import {IconTextGrid} from "./iconTextGrid";

type OpenSpaceInfoProps = {
    marker: MarkerType
    removeMarker: (marker: MarkerType) => void
    updateMarker: (marker: MarkerType) => void
}

export const OpenSpaceInfo = (props: OpenSpaceInfoProps) => {
    const [infoMarker, setInfoMarker] = useState<MarkerType>(props.marker)
    const [editOpen, setEditOpen] = useState<boolean>(false)

    function updateMarker(marker: MarkerType) {
        props.updateMarker(marker)
        setInfoMarker(marker)
    }

    return (
        <Box sx={{}}>
            <Grid container spacing={0} alignItems={"center"}>
                {/* Image */}
                <Grid item xs={12} textAlign={"center"}>
                    <ButtonBase onClick={() => {
                    }}>
                        <Image src={"/img/no-image-icon.png"}/>
                    </ButtonBase>
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
                    <Grid item xs={2}>
                        <Typography color='text.secondary' textAlign={"center"}>
                            <IconButton aria-label="edit" onClick={() => {
                                setEditOpen(true)
                            }}>
                                <Avatar sx={{bgcolor: yellow[700]}}>
                                    <EditIcon/>
                                </Avatar>
                            </IconButton>
                            Edit
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography color='text.secondary' textAlign={"center"}>
                            <IconButton aria-label="delete"
                                        onClick={() => props.removeMarker(props.marker)}>
                                <Avatar sx={{bgcolor: yellow[700]}}>
                                    <DeleteIcon/>
                                </Avatar>
                            </IconButton>
                            Delete
                        </Typography>
                    </Grid>
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