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

type OpenSpaceInfoProps = {
    marker: MarkerType
    removeMarker: (marker: MarkerType) => void
}
export const OpenSpaceInfo = (props: OpenSpaceInfoProps) => {
    const [infoMarker] = useState<MarkerType>(props.marker)

    const [editOpen, setEditOpen] = useState<boolean>(false)

    return (
        <Box sx={{}}>
            <Grid container spacing={0} alignItems={"center"} textAlign={"left"}>
                {/* Image */}
                <Grid item xs={12} textAlign={"center"}>
                    <ButtonBase onClick={() => {
                    }}>
                        <Image src={"/img/no-image-icon.png"}/>
                    </ButtonBase>
                </Grid>
                {/* Title */}
                <Grid item xs={12} textAlign={"left"}>
                    <Box sx={{p: 2}}>
                        <Typography variant={"h6"}>{infoMarker.title}</Typography>
                    </Box>
                </Grid>
                {/* Dates */}
                <Grid item xs={12} textAlign={"left"} container>
                    <Box sx={{px: 2, flexGrow: 1}}>
                        <Grid item xs={12} textAlign={"left"} container>
                            <Grid item xs={6} container>
                                <Grid item xs={2}>
                                    <WbSunnyIcon/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography color='text.secondary'>
                                        {infoMarker.startDate.format("DD.MM.YYYY")}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} container>
                                <Grid item xs={2}>
                                    <NightlightIcon/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography color='text.secondary'>
                                        {infoMarker.endDate.format("DD.MM.YYYY")}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} textAlign={"left"} container>
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
                <Grid item xs={12} textAlign={"left"} container>
                    <Box sx={{py: 2, flexGrow: 1}}>
                        <Divider/>
                    </Box>
                </Grid>

            </Grid>

            <OpenSpaceInfoEditDialog editOpen={editOpen} closeDialogHandler={() => setEditOpen(false)}
                                     marker={infoMarker}/>
        </Box>
    )
}